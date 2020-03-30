exports.port = 5000
exports.primusPort = 5001
exports.viewsDir =  `${__dirname}/views`

exports.engineOpts = {
  babel: {
    presets: [
      [
        '@babel/preset-env', {
          targets: { esmodules: true },
          bugfixes: true
        }
      ],
      [
        '@babel/preset-react', {
          useSpread: true
        }
      ],
      [
        '@emotion/babel-preset-css-prop', {
          sourceMap: false,
          autoLabel: false,
          cssPropOptimization: true
        }
      ]
    ]/* ,
    plugins: [
      'babel-plugin-macros',
      // '@babel/plugin-transform-react-jsx',
      // [ 'babel-plugin-inline-import', { extensions: ['.css'] } ]
    ] */
  }
}

exports.props = {
  title: 'Schlaq'
}
