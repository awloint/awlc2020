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

indexRouter.get('/verify', async(req:any, res:any) => {
  const queryparam = await JSON.parse(req.query.resp)
  const {data} = queryparam
  const {txRef} = data.data
  const {status} = data.data
  const {respcode} = queryparam
  console.log(respcode);
  console.log(txRef);
  console.log(status);

  try {
    await axios.post(`https://api.ravepay.co/flwv3-pug/getpaidx/api/v2/verify?txref=${txRef}`,
      {
        txref: txRef,
        SECKEY: envConfig.secretKey
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(async response => {
      console.log(response.data.data);
      if (
        response.data.data.status === "successful" &&
        response.data.data.chargecode == "00"
      ) {
        console.log('wow wow');
        
        let delegate = new Delegate();
        let delegateRepository = getRepository(Delegate);
        delegate.email = response.data.data.custemail;
        console.log(delegate);
        
        await delegateRepository.update(
          { email: delegate.email },
          { paid: "yes", paidAt: new Date() }
        );
// console.log(delegateRepository);

        let savedUser = await delegateRepository.findOne({ email: delegate.email });
        console.log(savedUser);

    //     let sms: SMS = new SMS();
    //     let savedEmail: Email = new Email();

    //     sms.send(
    //       "AWLOInt",
    //       savedUser.phone,
    //       `Dear ${name(
    //         savedUser.firstName,
    //         savedUser.lastName
    //       )}, thank you for registering for AWLC Sierra Leone 2020 holding from 2nd – 5th April 2020 at Freetown International Convention Center, Bintumani. Please check your email for more details.
    // #AWLCSierraLeone2020.
    // `
    //     );

    //     email.sendWithoutAttachment(
    //       savedUser.firstName,
    //       savedUser.lastName,
    //       savedUser.email,
    //       "African Women in Leadership Organisation",
    //       "info@awlo.org",
    //       "#AWLCSierraLeone2020: Your Registration is not complete",
    //       cancelledEmail.textBodyCancelled(
    //         savedUser.firstName,
    //         savedUser.lastName
    //       ),
    //       cancelledEmail.htmlBodyCancelled(
    //         savedUser.firstName,
    //         savedUser.lastName
    //       )
    //     );

    //     let newsletter: Newsletter = new Newsletter();
    //     newsletter.addToList(
    //     savedUser.firstName,
    //     savedUser.lastName,
    //     name(savedUser.firstName, savedUser.lastName),
    //     savedUser.email,
    //     savedUser.phone,
    //     savedUser.country,
    //     "12024")
      }
    });
  } catch (error) {
    console.log(error);
  }
});

//post routes
indexRouter.post("/register", async (req: any, res: any) => {
  console.log(req.fields);
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

  let newsletter: Newsletter = new Newsletter();
  newsletter.addToList(
    delegate.firstName,
    delegate.lastName,
    name(delegate.firstName, delegate.lastName),
    delegate.email,
    delegate.phone,
    delegate.country,
    "12025"
  );

  // initialize the payment details
  const redirectUrl = "http://localhost:3000/verify";
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
        onclose: () => {
          let sms: SMS = new SMS();
          let email: Email = new Email();

          sms.send(
            "AWLOInt",
            delegate.phone,
            `Dear ${name(
              delegate.firstName,
              delegate.lastName
            )}, thank you for taking steps to register for AWLC Sierra Leone 2020 holding from 2nd – 5th April 2020 at Freetown International Convention Center, Bintumani. To complete your registration, kindly visit https://awlo.org/awlc/awlc2020
    #AWLCSierraLeone2020.
    `
          );

          email.sendWithoutAttachment(
            delegate.firstName,
            delegate.lastName,
            delegate.email,
            "African Women in Leadership Organisation",
            "info@awlo.org",
            "#AWLCSierraLeone2020: Your Registration is not complete",
            cancelledEmail.textBodyCancelled(
              delegate.firstName,
              delegate.lastName
            ),
            cancelledEmail.htmlBodyCancelled(
              delegate.firstName,
              delegate.lastName
            )
          );

          res.redirect("https://awlo.org/awlc");
        },
        redirect_url: redirectUrl,
        subaccounts: [
          {
            id: "RS_D68E8E1087312CB80F3BD77721EEA468"
          }
        ]
      }
    }).then(response => {
      console.log(response.data.data.link);
      res.json(response.data.data.link)
    })
    .catch(err => {
      console.log(`hahahah wetin you think for this ${err}`);    
    })
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
    } else {
      res.send(JSON.stringify("user_exist_but_not_paid"));
    }
  } else {
    res.send(JSON.stringify("no_user"));
  }
});

app.use(config.baseUrl, indexRouter);

export { app };
