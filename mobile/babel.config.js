module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'module:metro-react-native-babel-preset',
      '@babel/preset-env',
      '@babel/preset-react',
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    env: {
      test: {
        plugins: ['@babel/plugin-transform-runtime'],
      },
    },
    plugins: [
      'react-native-reanimated/plugin',
    ],
  };
};
