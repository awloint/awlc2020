const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  next()
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  console.log('server started successfully')
  next()
})
app.get('/awlc/awlc2020/backend', (req, res) => {
  res.send('Working on the server')
})

app.get('/okay', (req, res) => {
  res.send('yeah!! server working')
})

module.exports = app
