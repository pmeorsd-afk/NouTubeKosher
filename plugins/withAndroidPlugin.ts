import { ConfigPlugin, withGradleProperties } from '@expo/config-plugins'
import { withAndroidManifest, withAppBuildGradle } from '@expo/config-plugins/build/plugins/android-plugins.js'

const withAndroidSigningConfig: ConfigPlugin = (config) => {
  config = withAndroidManifest(config, (config: any) => {
    const app = config.modResults.manifest.application?.[0]
    if (app) {
      app.$['android:extractNativeLibs'] = 'true'
    }
    return config
  })

  // Bump JVM memory and set minify/shrink options
  config = withGradleProperties(config, (config) => {
    const value = '-Xmx4g -XX:MaxMetaspaceSize=2g'
    const existing = config.modResults.find(
      (item): item is { type: 'property'; key: string; value: string } =>
        item.type === 'property' && item.key === 'org.gradle.jvmargs',
    )
    if (existing) {
      existing.value = value
    } else {
      config.modResults.push({ type: 'property', key: 'org.gradle.jvmargs', value })
    }

    // Enable minify in release
    const existingMinify = config.modResults.find(
      (item): item is { type: 'property'; key: string; value: string } =>
        item.type === 'property' && item.key === 'android.enableMinifyInReleaseBuilds',
    )
    if (existingMinify) {
      existingMinify.value = 'true'
    } else {
      config.modResults.push({ type: 'property', key: 'android.enableMinifyInReleaseBuilds', value: 'true' })
    }

    // Enable shrink resources in release
    const existingShrink = config.modResults.find(
      (item): item is { type: 'property'; key: string; value: string } =>
        item.type === 'property' && item.key === 'android.enableShrinkResourcesInReleaseBuilds',
    )
    if (existingShrink) {
      existingShrink.value = 'true'
    } else {
      config.modResults.push({ type: 'property', key: 'android.enableShrinkResourcesInReleaseBuilds', value: 'true' })
    }

    return config
  })

  return withAppBuildGradle(config, (config) => {
    // https://www.reddit.com/r/expo/comments/1j4v323/comment/mit9b2a/
    config.modResults.contents = config.modResults.contents
      .replace(
        'android {',
        `ext.abiCodes = [x86:1, x86_64:2, 'armeabi-v7a':3, 'arm64-v8a': 4]
 
android {`,
      )
      .replace('zh-Hans', 'b+zh+Hans')
      .replace('zh-Hant', 'b+zh+Hant')
      .replace('pt-BR', 'b+pt+BR')
      .replace(
        /androidResources \{([\s\S]*?)}/,
        `androidResources {$1}
    dependenciesInfo {
        includeInApk = false
        includeInBundle = false
    }
    splits {
        abi {
            reset()
            enable true
            universalApk false
            include project.ext.abiCodes.keySet() as String[]
        }
    }
    android.applicationVariants.configureEach { variant ->
        variant.outputs.each { output ->
            def baseAbiVersionCode = project.ext.abiCodes.get(output.getFilter(com.android.build.OutputFile.ABI))
            if (baseAbiVersionCode != null) {
                output.versionCodeOverride = (100 * project.android.defaultConfig.versionCode) + baseAbiVersionCode
            }
        }
    }`,
      )

    return config
  })
}

export default withAndroidSigningConfig
