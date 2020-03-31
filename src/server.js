const express = require('express')
const reactViews = require('express-react-views')
const cookieParser = require('cookie-parser')
const authUserRedirect = require('./modules/authentication').authedUserRedirect
const protectedRoute = require('./modules/authentication').protectedRoute
require('dotenv').config()

const http = require('http')
const Primus = require('primus')
const Terser = require('terser')

const { port, primusPort, viewsDir, engineOpts } = require('./globals')
const expressRoutes = require('./routes/express')
const primusRoutes = require('./routes/primus')
const loginRoute = require('./routes/auth/login-endpoint')
const signUpRoute = require('./routes/auth/signup-endpoint')
const dbRoute = require('./routes/sql-endpoints')

const server = express()
const httpServer = http.createServer(server)
const primus = new Primus( httpServer, {
  transformer: 'websockets',
  parser: 'JSON',
  compression: true
})
server.locals.primusLib = Terser.minify( primus.library() ).code

server.use( express.static( 'public' ) )
server.use( express.json() )
server.use( express.urlencoded({ extended: true }) )
server.use( cookieParser() )

server.set( 'views', viewsDir )
server.set( 'view engine', 'jsx' )
server.engine( 'jsx', reactViews.createEngine( engineOpts ) )

server.use( '/login', loginRoute )
server.use( '/signup', signUpRoute )
server.use( '/db', dbRoute )

server.get( '/', authUserRedirect, expressRoutes.index )
server.get( '/:workspace/:scope', protectedRoute, expressRoutes.workspaceScope )
server.listen( port, () => console.log( `\nServer is live at http://localhost:${port}` ) )

const broadcast = ({ profilePic, username, message }) => primus.write({ profilePic, username, message })

primus.on( 'connection', /* primusRoutes.connection */ (spark) => {
  console.log(`${spark.address.ip} connected`)
  console.log( spark.query.locals )

  const [ ,payload ] = spark.request.headers.cookie.split('.')
  const {
    user_name: username,
    profile_picture_link: profilePic
  } = JSON.parse( Buffer.from( payload, 'base64' ) )

  spark.on( 'data', (message) => {
    console.log( `client ${username}:`, message )
    // spark.write({ profilePic, username, message })
    broadcast({ profilePic, username, message })
  })
} )
primus.on( 'disconnection', primusRoutes.disconnection )
httpServer.listen( primusPort, () => console.log( `Primus is live at http://localhost:${primusPort}` ) )
