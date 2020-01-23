const PORT = process.env.PORT || 3000;
const http = require('http');
const app = require('./routes/app')

const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('Working on the server')
})

app.get('/okay', (req, res) => {
  res.send('yeah!! server working')
})

server.listen(PORT)