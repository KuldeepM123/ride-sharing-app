const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');

const customConfig = {
  resolver: {
    blacklistRE: exclusionList([
      /node_modules\/.*\/node_modules\/react-native\/.*/, // Duplicate React Native modules
      /.*\/__tests__\/.*/, // Exclude test files
      /ios\/build\/.*/, // Exclude iOS build folder
      /android\/build\/.*/, // Exclude Android build folder
      /.*\.git\/.*/, // Exclude .git folder
    ]),
  },
  watchFolders: ['./src'], // Only watch source code folder
};

module.exports = mergeConfig(getDefaultConfig(__dirname), customConfig);
