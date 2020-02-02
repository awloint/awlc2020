"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config = __importStar(require("./config"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_formidable_1 = __importDefault(require("express-formidable"));
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const Delegate_1 = require("../entity/Delegate");
const envConfig = __importStar(require("../envConfig"));
const axios_1 = __importDefault(require("axios"));
// import cors from "cors";
// Import Modules
const cancelledEmail = __importStar(require("../emails/cancelledRegistration"));
const successEmail = __importStar(require("../emails/successfulRegistration"));
const email_1 = require("../modules/email");
const sms_1 = require("../modules/sms");
const newsletter_1 = require("../modules/newsletter");
typeorm_1.createConnection();
const app = express_1.default();
exports.app = app;
const indexRouter = express_1.default.Router();
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(express_formidable_1.default());
// app.use(cors());
app.use((req, res, next) => {
    console.log("server started successfully");
    next();
});
// extra functions
const name = (firstName, lastName) => {
    return `${firstName} ${lastName}`;
};
//get routes
indexRouter.get("/", (req, res) => {
    console.log(req.query);
    res.send("Working on the server");
});
indexRouter.get('/verify', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const queryparam = yield JSON.parse(req.query.resp);
    const { data } = queryparam;
    const { txRef } = data.tx;
    const { status } = data.tx;
    const { respcode } = queryparam;
    console.log(respcode);
    console.log(txRef);
    console.log(status);
    console.log(queryparam);
    //   console.log(data.tx)
    try {
        yield axios_1.default.post(`https://api.ravepay.co/flwv3-pug/getpaidx/api/v2/verify?txref=${txRef}`, {
            txref: txRef,
            SECKEY: envConfig.secretKey
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(response.data.data);
            if (response.data.data.status === "successful" &&
                response.data.data.chargecode == "00") {
                console.log('wow wow');
                let delegate = new Delegate_1.Delegate();
                let delegateRepository = typeorm_2.getRepository(Delegate_1.Delegate);
                delegate.email = response.data.data.custemail;
                // console.log(delegate);
                yield delegateRepository.update({ email: delegate.email }, { paid: "yes", paidAt: new Date() });
                // console.log(delegateRepository);
                let savedUser = yield delegateRepository.findOne({ email: delegate.email });
                console.log(savedUser);
                res.redirect("https://awlo.org/awlc");
                let sms = new sms_1.SMS();
                let savedEmail = new email_1.Email();
                sms.send("AWLOInt", savedUser.phone, `Dear ${name(savedUser.firstName, savedUser.lastName)}, thank you for registering for AWLC Sierra Leone 2020 holding from 2nd – 5th April 2020 at Freetown International Convention Center, Bintumani. Please check your email for more details.
    #AWLCSierraLeone2020.
    `);
                savedEmail.sendWithoutAttachment(savedUser.firstName, savedUser.lastName, savedUser.email, "African Women in Leadership Organisation", "info@awlo.org", "#AWLCSierraLeone2020: Registration Successful!", successEmail.textBodySuccess(savedUser.firstName, savedUser.lastName), successEmail.htmlBodySuccess(savedUser.firstName, savedUser.lastName));
                let newsletter = new newsletter_1.Newsletter();
                newsletter.addToList(savedUser.firstName, savedUser.lastName, name(savedUser.firstName, savedUser.lastName), savedUser.email, savedUser.phone, savedUser.country, "12024");
            }
        }));
    }
    catch (error) {
        console.log(error);
    }
}));
//post routes
indexRouter.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.fields);
    const data = req.fields;
    let delegate = new Delegate_1.Delegate();
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
    let delegateRepository = typeorm_2.getRepository(Delegate_1.Delegate);
    yield delegateRepository.save(delegate);
    console.log("User has been saved");
    // let savedUser = await delegateRepository.find();
    // console.log("All Users from the db: ", savedUser);
    let newsletter = new newsletter_1.Newsletter();
    newsletter.addToList(delegate.firstName, delegate.lastName, name(delegate.firstName, delegate.lastName), delegate.email, delegate.phone, delegate.country, "12025");
    // initialize the payment details
    const redirectUrl = "http://localhost:3000/verify";
    var currency = "NGN";
    var amount = 126875;
    let txref = "AWLCSierra2020-" + Math.floor(Math.random() * 68954123) + 123145;
    if (delegate.country !== "Nigeria") {
        currency = "USD";
    }
    if (currency == "USD") {
        amount = 350;
    }
    try {
        yield axios_1.default({
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
                    let sms = new sms_1.SMS();
                    let email = new email_1.Email();
                    sms.send("AWLOInt", delegate.phone, `Dear ${name(delegate.firstName, delegate.lastName)}, thank you for taking steps to register for AWLC Sierra Leone 2020 holding from 2nd – 5th April 2020 at Freetown International Convention Center, Bintumani. To complete your registration, kindly visit https://awlo.org/awlc/awlc2020
    #AWLCSierraLeone2020.
    `);
                    email.sendWithoutAttachment(delegate.firstName, delegate.lastName, delegate.email, "African Women in Leadership Organisation", "info@awlo.org", "#AWLCSierraLeone2020: Your Registration is not complete", cancelledEmail.textBodyCancelled(delegate.firstName, delegate.lastName), cancelledEmail.htmlBodyCancelled(delegate.firstName, delegate.lastName));
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
            res.json(response.data.data.link);
        })
            .catch(err => {
            console.log(`hahahah wetin you think for this ${err}`);
        });
    }
    catch (error) {
        console.log(`nah for catch block ooo -> ${error}`);
    }
}));
indexRouter.post("/checkuser", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log(req.fields);
    let delegateRepository = typeorm_1.getConnection().getRepository(Delegate_1.Delegate);
    let singleDelegate = yield delegateRepository.findOne({
        email: req.fields.email
    });
    console.log("Delegate: ", singleDelegate);
    if (singleDelegate) {
        if (singleDelegate.paid === "yes") {
            res.send(JSON.stringify("user_exists"));
        }
        else {
            res.send(JSON.stringify("user_exist_but_not_paid"));
        }
    }
    else {
        res.send(JSON.stringify("no_user"));
    }
}));
app.use(config.baseUrl, indexRouter);
