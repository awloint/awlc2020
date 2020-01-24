const config = require('./config.js')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const indexRouter = express.Router();

app.use((req:any, res:any, next:any) => {
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

app.use((req: any, res: any, next: any) => {
  console.log("server started successfully");
  next();
});

indexRouter.get("/", (req: any, res: any) => {
  res.send("Working on the server");
});


indexRouter.get("/okay", (req: any, res: any) => {
  res.send("yeah!! server working");
});

indexRouter.get("/chiamaka", (req: any, res: any) => {
  res.send("Chiamaka is an awesome lady");
});

indexRouter.get("/work", (req: any, res: any) => {
  res.send("Work is great!");
});

app.use(config.baseUrl, indexRouter)

module.exports = app
