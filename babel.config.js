module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: false,
        decoratorsBeforeExport: false,
      },
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
  ],
}
