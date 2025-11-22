const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const path = require('path');

const customConfig = {
  resolver: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@screens': path.resolve(__dirname, 'src/screens'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@images': path.resolve(__dirname, 'src/assets/images'),
      '@icons': path.resolve(__dirname, 'src/assets/icons'),
      '@modules': path.resolve(__dirname, 'src/assets/modules'),
      '@navigation': path.resolve(__dirname, 'src/navigation'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@services': path.resolve(__dirname, 'src/Services'),
      '@customer': path.resolve(__dirname, 'src/modules/Customer'),
    },
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
