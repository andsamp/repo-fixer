module.exports = {
  env: {
    test: {
      presets: ['@babel/preset-env'],
      plugins: [
        'dynamic-import-node',
        '@babel/plugin-transform-runtime'
      ]
    }
  },
  presets: [
    ['@babel/env', {
      targets: {
        node: 'current',
      }
    }]
  ]
}
