import config from "./config";
import express from "express";
import bodyParser from "body-parser";
import formidable from "express-formidable";
import { createConnection } from "typeorm";
import { getRepository } from "typeorm";
import { Delegate } from "../../entity/Delegate";

const app = express();
const indexRouter = express.Router();

app.use((req: any, res: any, next: any) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(formidable());

app.use((req: any, res: any, next: any) => {
  console.log("server started successfully");
  next();
});

//get routes
indexRouter.get("/", (req: any, res: any) => {
  res.send("Working on the server");
});

//post routes
indexRouter.post("/register", (req: any, res: any, next: any) => {
  console.log(req.fields);
  const data = req.fields;
  createConnection(/*...*/)
    .then(async connection => {
      let delegate = new Delegate();
      delegate.firstName = data.firstName;
      delegate.lastName = data.firstName;
      delegate.email = data.email;
      delegate.phone = data.full_phone;
      delegate.country = data.country;
      delegate.occupation = data.occupation;
      delegate.organisation = data.organisation;
      delegate.member = data.member;
      delegate.referringChannel = data.referringChannel;
      delegate.firstConference = data.firstConference;
      delegate.referrer = data.referrer;
      let delegateRepository = connection.getRepository(Delegate);
      await delegateRepository.save(delegate);
      console.log("User has been saved");

      let savedUser = await delegateRepository.find();
      console.log("All Users from the db: ", savedUser);
    })
    .catch(error => console.log(error));
  // res.send(JSON.stringify(req.fields))
});

indexRouter.post("/checkuser", (req: any, res: any, next: any) => {
  //   console.log(req.fields);
  createConnection(/*...*/).then(async connection => {
    let delegateRepository = getRepository(Delegate);
    let singleDelegate = await delegateRepository.findOne({
      email: req.fields.email
    });
    console.log("Delegate: ", singleDelegate);

    if (singleDelegate) {
      if (singleDelegate.paid === "yes") {
        res.send(JSON.stringify("user_exists"));
      }
    } else {
      res.send(JSON.stringify("no_user"));
    }
  });
});

app.use(config.baseUrl, indexRouter);

export { app };
