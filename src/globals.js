exports.port = 5000
exports.viewsDir =  `${__dirname}/views`

exports.engineOpts = {
  babel: {
    presets: [ '@babel/preset-env', '@babel/preset-react' ],
    plugins: [ [ 'styled-jsx/babel', { optimizeForSpeed: true } ] ]
  }
}

exports.props = {
  title: 'Schlack',
  msg: 'the quick brown fox jumped over the lazy dog'
}
