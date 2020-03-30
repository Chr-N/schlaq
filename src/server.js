const express = require('express')
const reactViews = require('express-react-views')
const http = require('http')
const Primus = require('primus')
const Terser = require('terser')

const { port, primusPort, viewsDir, engineOpts } = require('./globals')
const expressRoutes = require('./routes/express')
const primusRoutes = require('./routes/primus')

const server = express()
const httpServer = http.createServer(server)
const primus = new Primus( httpServer, {
  transformer: 'websockets',
  parser: 'JSON',
  compression: true
})
server.locals.primusLib = Terser.minify( primus.library() ).code

server.use( express.static( 'public' ) )
server.set( 'views', viewsDir )
server.set( 'view engine', 'jsx' )
server.engine( 'jsx', reactViews.createEngine( engineOpts ) )

server.get( '/', expressRoutes.index )
server.get( '/:workspace/:scope', expressRoutes.workspaceScope )
server.listen( port, () => console.log( `\nServer is live at http://localhost:${port}` ) )

primus.on( 'connection', primusRoutes.connection )
primus.on( 'disconnection', primusRoutes.disconnection )
httpServer.listen( primusPort, () => console.log( `Primus is live at http://localhost:${primusPort}` ) )
