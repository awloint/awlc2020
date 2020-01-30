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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_formidable_1 = __importDefault(require("express-formidable"));
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const Delegate_1 = require("../../entity/Delegate");
const envConfig = __importStar(require("../envConfig"));
const axios_1 = __importDefault(require("axios"));
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
app.use((req, res, next) => {
    console.log("server started successfully");
    next();
});
//get routes
indexRouter.get("/ok", (req, res) => {
    console.log(req.query);
    res.send("Working on the server");
});
indexRouter.get('/verify', (req, res, next) => {
    const { txref } = req.query;
    console.log(txref);
    try {
        axios_1.default({
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
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
//post routes
indexRouter.post("/register", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.fields);
    const data = req.fields;
    let delegate = new Delegate_1.Delegate();
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
    let delegateRepository = typeorm_2.getRepository(Delegate_1.Delegate);
    yield delegateRepository.save(delegate);
    console.log("User has been saved");
    let savedUser = yield delegateRepository.find();
    console.log("All Users from the db: ", savedUser);
    // initialize the payment details
    const redirectUrl = "https://awlo.org/awlc/awlc2020/backend/verify";
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
                redirect_url: redirectUrl
            }
        }).then(response => {
            //   console.log(response.data.data.link);
            res.send(JSON.stringify(response.data.data.link));
        });
    }
    catch (error) {
        next(error);
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
app.use(config_1.default.baseUrl, indexRouter);
