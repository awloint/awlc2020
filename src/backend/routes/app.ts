import config from './config';
import express from 'express';
import bodyParser from 'body-parser';
import formidable from 'express-formidable';
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
app.use(formidable())

app.use((req: any, res: any, next: any) => {
  console.log("server started successfully");
  next();
});

//get routes
indexRouter.get("/", (req: any, res: any) => {
  res.send("Working on the server");
});


//post routes
indexRouter.post('/register', (req:any, res: any, next: any) => {
  console.log(req.fields);
  res.send(JSON.stringify(req.fields))

})

app.use(config.baseUrl, indexRouter)

export {app}
