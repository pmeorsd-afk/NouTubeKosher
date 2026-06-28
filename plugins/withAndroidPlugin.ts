import { ConfigPlugin, withGradleProperties, withProjectBuildGradle } from '@expo/config-plugins'
import { withAndroidManifest, withAppBuildGradle } from '@expo/config-plugins/build/plugins/android-plugins.js'

const withAndroidSigningConfig: ConfigPlugin = (config) => {
  config = withAndroidManifest(config, (config: any) => {
    const app = config.modResults.manifest.application?.[0]
    if (app) {
      app.$['android:extractNativeLibs'] = 'true'
    }
    return config
  })

  // Bump JVM memory
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

    // Force disable minification and shrinking in release to avoid JSI JNI crashes
    const minifyProperty = 'android.enableMinifyInReleaseBuilds';
    const existingMinify = config.modResults.find(
      (item): item is { type: 'property'; key: string; value: string } =>
        item.type === 'property' && item.key === minifyProperty,
    )
    if (existingMinify) {
      existingMinify.value = 'false'
    } else {
      config.modResults.push({ type: 'property', key: minifyProperty, value: 'false' })
    }

    const shrinkProperty = 'android.enableShrinkResourcesInReleaseBuilds';
    const existingShrink = config.modResults.find(
      (item): item is { type: 'property'; key: string; value: string } =>
        item.type === 'property' && item.key === shrinkProperty,
    )
    if (existingShrink) {
      existingShrink.value = 'false'
    } else {
      config.modResults.push({ type: 'property', key: shrinkProperty, value: 'false' })
    }

    return config
  })

  // Pin NDK version in the root build.gradle
  config = withProjectBuildGradle(config, (config) => {
    if (!config.modResults.contents.includes('ndkVersion = "26.3.11579264"')) {
      config.modResults.contents = config.modResults.contents.replace(
        /allprojects\s*\{([\s\S]*?)ext\s*\{/,
        `allprojects {
  ext {
    ndkVersion = "26.3.11579264"`
      )
    }
    return config
  })

  return withAppBuildGradle(config, (config) => {
    // Modify build.gradle to disable ABI splits (resulting in a single universal APK)
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
            enable false
        }
    }`,
      )

    // Append our CMake prefab patching task to build.gradle to fix compile errors
    if (!config.modResults.contents.includes('tasks.configureEach')) {
      config.modResults.contents += `

tasks.configureEach { task ->
    if (task.name.startsWith("configureCMake") || task.name.startsWith("buildCMake") || task.name.startsWith("generateJsonModel")) {
        task.doFirst {
            def prefabDir = new File(gradle.gradleUserHomeDir, "caches")
            if (prefabDir.exists()) {
                prefabDir.eachFileRecurse { file ->
                    if (file.name == "graphicsConversions.h") {
                        def content = file.text
                        if (content.contains('return std::format("{}%", dimension.value);')) {
                            content = content.replace(
                                'return std::format("{}%", dimension.value);',
                                'return std::to_string(dimension.value) + "%";'
                            )
                            file.write(content)
                            println "Successfully patched cached prefab header: \${file.absolutePath}"
                        }
                    }
                }
            }
        }
    }
}
`
    }

    return config
  })
}

export default withAndroidSigningConfig
