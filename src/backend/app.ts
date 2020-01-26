const port =  process.env.PORT || 3000
const hostname:any = '127.0.0.1'
import {createServer} from 'http';
import {app} from './routes/app';

const server = createServer(app)

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
