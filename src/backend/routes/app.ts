import * as config from "./config";
import express from "express";
import bodyParser, { json } from "body-parser";
import formidable from "express-formidable";
import { createConnection, getConnection } from "typeorm";
import { getRepository } from "typeorm";
import { Delegate } from "../entity/Delegate";
import * as envConfig from "../envConfig";
import axios from "axios";
// import cors from "cors";

// Import Modules
import * as cancelledEmail from "../emails/cancelledRegistration";
import * as successEmail from "../emails/successfulRegistration";
import { Email } from "../modules/email";
import { SMS } from "../modules/sms";
import { Newsletter } from "../modules/newsletter";
import { Payment } from "../modules/payment";
import { SendSmsEmail } from "../modules/send-sms-email"

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
// app.use(cors());

app.use((req: any, res: any, next: any) => {
  console.log("server started successfully");
  next();
});

// extra functions
const name = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`;
};

//get routes
indexRouter.get("/", (req: any, res: any) => {
  console.log(req.query);

  res.send("Working on the server");
});

indexRouter.get("/verify", async (req: any, res: any) => {
  const queryparam = await JSON.parse(req.query.resp);
  // console.log(queryparam);
  const { data } = queryparam;
  // console.log(data.data);
  const { txRef } = data.data;
  const { status } = data.data;
  const { respcode } = queryparam;
  console.log(respcode);
  console.log(txRef);
  console.log(status);
  //   console.log(data.tx)

  try {
    await axios
      .post(
        `https://api.ravepay.co/flwv3-pug/getpaidx/api/v2/verify?txref=${txRef}`,
        {
          txref: txRef,
          SECKEY: envConfig.secretKey
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(async response => {
        // console.log(response.data.data);
        if (
          response.data.data.status === "successful" &&
          response.data.data.chargecode == "00"
        ) {
          // console.log("wow wow");

          const sendSmsEmail: SendSmsEmail = new SendSmsEmail()
          let delegate = new Delegate();
          let delegateRepository = getRepository(Delegate);
          delegate.email = response.data.data.custemail;
          // console.log(delegate);

          await delegateRepository.update(
            { email: delegate.email },
            { paid: "yes", paidAt: new Date() }
          );
          // console.log(delegateRepository);

          let savedUser = await delegateRepository.findOne({
            email: delegate.email
          });
          console.log(savedUser);
          res.redirect("https://awlo.org/awlc");

        //send sms
        sendSmsEmail.email_sms(delegate);
        }
      }).catch(err => {
        console.log(`no mention dis gbege - ${err}`);
        
      })
  } catch (error) {
    console.log(error);
  }
});

//post routes
indexRouter.post("/register", async (req: any, res: any) => {
  // console.log(req.fields);
  const data = req.fields;
  let delegate = new Delegate();
  delegate.firstName = data.firstName;
  delegate.lastName = data.lastName;
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

  // let savedUser = await delegateRepository.find();
  // console.log("All Users from the db: ", savedUser);

  try {
    const payment: Payment = new Payment();
    await payment
      .start(delegate, 126875, "NGN")
      .then(response => {
        console.log(response.data.data.link);
        res.json(response.data.data.link);
      })
      .catch(err => {
        console.log(`hahahah wetin you think for this ${err}`);
      });
  } catch (error) {
    console.log(`nah for catch block ooo -> ${error}`);
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
    } else if (singleDelegate !== undefined){
      try {
        const payment: Payment = new Payment();
        await payment
          .start(singleDelegate, 126875, "NGN")
          .then(response => {
            console.log(response.data.data.link);
            res.json(response.data.data.link);
          })
          .catch(err => {
            console.log(`hahahah wetin you think for this ${err}`);
          });
      } catch (error) {
        console.log(`nah for catch block ooo -> ${error}`);
      }
    //   res.send(JSON.stringify("user_exist_but_not_paid"));
    }
  } else if (singleDelegate == undefined) {
    res.send(JSON.stringify("no_user"));
    console.log(`yawa - ${singleDelegate}`);
  }
});

app.use(config.baseUrl, indexRouter);

export { app };
