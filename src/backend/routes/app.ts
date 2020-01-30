import config from "./config";
import express from "express";
import bodyParser from "body-parser";
import formidable from "express-formidable";
import { createConnection, getConnection } from "typeorm";
import { getRepository } from "typeorm";
import { Delegate } from "../../entity/Delegate";
import * as envConfig from "../envConfig"
import axios from "axios";

createConnection();

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
indexRouter.get("/ok", (req: any, res: any) => {
  console.log(req.query);
  
  res.send("Working on the server");
});

indexRouter.get('/verify', (req:any, res:any, next:any) => {
  const {txref} = req.query;
  console.log(txref);
  
  try {
    axios({
      method: "post",
      url: "https://api.ravepay.com/flwv3-pug/getpaidx/api/v2/verify",
      data: {
        txref: txref,
        SECKEY: envConfig.secretKey
      }
    }).then(response => {
      console.log(response.data);
      // res.send(JSON.stringify(response.data.data.link));
    });
  } catch (error) {
    console.log(error);
    
    next(error);
  }
})


//post routes
indexRouter.post("/register", async (req: any, res: any, next: any) => {
  console.log(req.fields);
  const data = req.fields;
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
  let delegateRepository = getRepository(Delegate);
  await delegateRepository.save(delegate);
  console.log("User has been saved");

  let savedUser = await delegateRepository.find();
  console.log("All Users from the db: ", savedUser);

  // initialize the payment details
  const redirectUrl = "https://awlo.org/awlc/awlc2020/backend/verify";
  var currency: string= "NGN";
  var amount: number = 126875;
  let txref: string =
    "AWLCSierra2020-" + Math.floor(Math.random() * 68954123) + 123145;
  if (delegate.country !== "Nigeria") {
    currency = "USD";
  }

  if (currency == "USD") {
    amount = 350;
  }


  try {
    await axios({
      method: "post",
      url: "https://api.ravepay.co/flwv3-pug/getpaidx/api/v2/hosted/pay",
      data: {
        amount: amount,
        customer_email: delegate.email,
        customer_phone: delegate.phone,
        customer_firstname: delegate.firstName,
        customer_lastname: delegate.lastName,
        custom_title: "AWLCSierraLeone2020",
        custom_logo: "https://awlo.org/wp-content/uploads/2019/01/awlox120.png",
        custom_description: "African Women in Leadership Conference 2020",
        currency: currency,
        txref: txref,
        PBFPubKey: envConfig.raveKey,
        redirect_url: redirectUrl
      }
    }).then(response => {
    //   console.log(response.data.data.link);
      res.send(JSON.stringify(response.data.data.link));
    });
  } catch (error) {
    next(error);
  }
});

indexRouter.post("/checkuser", async (req: any, res: any, next: any) => {
  //   console.log(req.fields);
  let delegateRepository = getConnection().getRepository(Delegate);
  let singleDelegate = await delegateRepository.findOne({
    email: req.fields.email
  });
  console.log("Delegate: ", singleDelegate);

  if (singleDelegate) {
    if (singleDelegate.paid === "yes") {
      res.send(JSON.stringify("user_exists"));
    } else {
        res.send(JSON.stringify("user_exist_but_not_paid"))
    }
  } else {
    res.send(JSON.stringify("no_user"));
  }
});

app.use(config.baseUrl, indexRouter);

export { app };
