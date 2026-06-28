const fs = require('fs');
const path = require('path');

// 1. Patch react-native-reanimated
const reanimatedDir = path.join(__dirname, '../node_modules/react-native-reanimated/Common/cpp/reanimated/CSS/interpolation/transforms');
const patchHeaderSource = path.join(__dirname, 'patches/TransformOperationInterpolator.h');
const patchCppSource = path.join(__dirname, 'patches/TransformOperationInterpolator.cpp');

if (fs.existsSync(reanimatedDir)) {
  const targetHeader = path.join(reanimatedDir, 'TransformOperationInterpolator.h');
  const targetCpp = path.join(reanimatedDir, 'TransformOperationInterpolator.cpp');

  if (fs.existsSync(patchHeaderSource)) {
    fs.copyFileSync(patchHeaderSource, targetHeader);
    console.log('Successfully patched react-native-reanimated: TransformOperationInterpolator.h');
  }
  if (fs.existsSync(patchCppSource)) {
    fs.copyFileSync(patchCppSource, targetCpp);
    console.log('Successfully patched react-native-reanimated: TransformOperationInterpolator.cpp');
  }
} else {
  console.log('Note: react-native-reanimated directory not found, skipping Reanimated patch.');
}

// 2. Patch react-native-nitro-modules CMakeLists.txt
const nitroCmakePath = path.join(__dirname, '../node_modules/react-native-nitro-modules/android/CMakeLists.txt');
if (fs.existsSync(nitroCmakePath)) {
  let content = fs.readFileSync(nitroCmakePath, 'utf8');
  if (!content.includes('c++_shared')) {
    // Inject c++_shared under fbjni::fbjni ReactAndroid::jsi block
    content = content.replace('ReactAndroid::jsi', 'ReactAndroid::jsi\n        c++_shared');
    fs.writeFileSync(nitroCmakePath, content, 'utf8');
    console.log('Successfully patched react-native-nitro-modules: CMakeLists.txt');
  } else {
    console.log('react-native-nitro-modules: CMakeLists.txt already patched.');
  }
} else {
  console.log('Note: react-native-nitro-modules directory not found, skipping NitroModules patch.');
}
