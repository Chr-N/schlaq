module.exports = () => {
    const express = require('express')
    const reactViews = require('express-react-views')
    const { port, viewsDir, engineOpts, props } = require('./globals')
    const { messages } = require('./db/db')

    const server = express()

    const databaseRoute = require('./routes/sql-endpoints')


    server.set( 'views', viewsDir )
    server.set( 'view engine', 'jsx' )
    server.engine( 'jsx', reactViews.createEngine( engineOpts ) )


    server.use('/database', databaseRoute)


    server.get( '/', (req,res) => res.render( 'App', {...props, name: 'bob'} ) )
    server.get( '/messages', (req,res) => res.render( 'App', {...props, messages } ) )

    return server;
}
