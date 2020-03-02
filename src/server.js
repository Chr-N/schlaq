const Koa = require('koa')
const { port, map } = require('./globals')
const { messages } = require('./db/db')
const server = new Koa()

server.use( (ctx) => ctx.body = map[ctx.path] )

server.listen( port, () => console.log( `\nServer is live at http://localhost:${port}` ) )
