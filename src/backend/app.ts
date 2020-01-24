const port =  process.env.PORT || 3000
const hostname = '127.0.0.1'
const http = require('http')
const expressapp = require('./routes/app')

const server = http.createServer(expressapp)

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
