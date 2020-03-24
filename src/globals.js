exports.port = 5000
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
      ]
    ],
    plugins: [ [ 'styled-jsx/babel', { optimizeForSpeed: true } ] ]
  }
}

exports.props = {
  title: 'Schlaq',
  msg: 'the quick brown fox jumped over the lazy dog'
}
