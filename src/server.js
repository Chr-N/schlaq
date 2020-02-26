const Koa = require('koa')
const { port } = require('./globals')
const { messages } = require('./db/db')
const server = new Koa()

const map = {
  '/': `<p>Hello</p><a href='/test'>/test</a>`,
  '/test': `<p>Sam</p><a href='/'>Go back</a>`
}

server.use( (ctx) => ctx.body = map[ctx.path] )

server.listen( port, () => console.log( `\nServer is live at http://localhost:${port}` ) )
