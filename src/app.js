module.exports = () => {
    const express = require('express')
    const reactViews = require('express-react-views')
    const { port, viewsDir, engineOpts, props } = require('./globals')
    const { messages } = require('./db/db')
    const cookieParser = require('cookie-parser')
    const bodyParser = require('body-parser');
    require('dotenv').config()


    const server = express()
    
    //server.use(express.json())
    server.use(express.urlencoded({ extended: false }))
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(cookieParser());

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
