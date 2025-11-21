module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@screens': './src/modules',
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
          '@driver': './src/modules/Driver',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
