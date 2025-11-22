module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@assets': './src/assets',
          '@images': './src/assets/images',
          '@icons': './src/assets/icons',
          '@modules': './src/assets/modules',
          '@navigation': './src/navigation',
          '@utils': './src/utils',
          '@context': './src/context',
          '@hooks': './src/hooks',
          '@api': './src/api',
          '@services': './src/Services',
          '@customer': './src/modules/Customer',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
