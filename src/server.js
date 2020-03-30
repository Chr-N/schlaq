const express = require('express')
const reactViews = require('express-react-views')
const { port, viewsDir, engineOpts } = require('./globals')
const { title } = require('./globals').props
const { users, starred, channels, dms, messages } = require('./db/db')
const starredArr = starred.map( ({ starred }) => starred )

const server = express()

server.use( express.static( 'public' ) )
server.set( 'views', viewsDir )
server.set( 'view engine', 'jsx' )
server.engine( 'jsx', reactViews.createEngine( engineOpts ) )

server.get( '/', (req,res) => res.redirect('/FSWD/general') )

server.get( '/:workspace/:scope', (req,res) => {
  console.log(req.params)

  res.render( 'App', {
  title,
  user: 'Timothy',
  workspaceScope: req.params.workspace,
  workspaces: users['Timothy'],
  starred,
  channels,
  dms,
  messages,
  scope: req.params.scope,
  scopeStarred: starredArr.includes( req.params.scope )
})})

server.listen( port, () => console.log( `\nServer is live at http://localhost:${port}` ) )
