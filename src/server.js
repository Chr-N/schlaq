const express = require('express')
const reactViews = require('express-react-views')
const { port, viewsDir, engineOpts, props } = require('./globals')
const { messages } = require('./db/db')

const server = express()

server.use( express.static( 'public' ) )
server.set( 'views', viewsDir )
server.set( 'view engine', 'jsx' )
server.engine( 'jsx', reactViews.createEngine( engineOpts ) )

server.get( '/', (req,res) => res.render( 'App', {...props, name: 'bob'} ) )
server.get( '/messages', (req,res) => res.render( 'App', {...props, messages } ) )

server.listen( port, () => console.log( `\nServer is live at http://localhost:${port}` ) )
