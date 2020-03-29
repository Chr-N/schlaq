const express = require('express')
const reactViews = require('express-react-views')
const { port, viewsDir, engineOpts } = require('./globals')
const { title, defaultScope } = require('./globals').props
const { starred, channels, dms, messages } = require('./db/db')
const starredArr = starred.map( ({ starred }) => starred )

const server = express()

server.use( express.static( 'public' ) )
server.set( 'views', viewsDir )
server.set( 'view engine', 'jsx' )
server.engine( 'jsx', reactViews.createEngine( engineOpts ) )

server.get( '/', (req,res) => res.render( 'App', {
  title,
  starred,
  channels,
  dms,
  messages,
  scope: defaultScope,
  scopeStarred: starredArr.includes( defaultScope )
}))

server.get( '/:scope', (req,res) => res.render( 'App', {
  title,
  starred,
  channels,
  dms,
  messages,
  scope: req.params.scope,
  scopeStarred: starredArr.includes( req.params.scope )
}))


server.listen( port, () => console.log( `\nServer is live at http://localhost:${port}` ) )
