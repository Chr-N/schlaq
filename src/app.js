module.exports = () => {
    const express = require('express')
    const reactViews = require('express-react-views')
    const { port, viewsDir, engineOpts, props } = require('./globals')
    const { messages } = require('./db/db')
    require('dotenv').config()


    const server = express()

    const loginRoute = require('./routes/login-endpoint')
    const signUpRoute = require('./routes/signup-endpoint')
    const databaseRoute = require('./routes/sql-endpoints')


    server.set( 'views', viewsDir )
    server.set( 'view engine', 'jsx' )
    server.engine( 'jsx', reactViews.createEngine( engineOpts ) )

    server.use('/login', loginRoute)
    server.use('/signup', signUpRoute)
    server.use('/database', databaseRoute)


    server.get( '/', (req,res) => res.render( 'App', {...props, name: 'bob'} ) )
    server.get( '/messages', (req,res) => res.render( 'App', {...props, messages } ) )

    return server;
}
