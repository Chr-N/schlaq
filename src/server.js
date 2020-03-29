const { port } = require('./globals')
const server = require('./app')()

server.listen( port, () => console.log( `\nServer is live at http://localhost:${port}` ) )