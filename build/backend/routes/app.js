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
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_formidable_1 = __importDefault(require("express-formidable"));
const typeorm_1 = require("typeorm");
const Delegate_1 = require("../../entity/Delegate");
const app = express_1.default();
exports.app = app;
const indexRouter = express_1.default.Router();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
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
indexRouter.get("/", (req, res) => {
    res.send("Working on the server");
});
//post routes
indexRouter.post('/register', (req, res, next) => {
    console.log(req.fields);
    const data = req.fields;
    typeorm_1.createConnection( /*...*/).then((connection) => __awaiter(void 0, void 0, void 0, function* () {
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
        let delegateRepository = connection.getRepository(Delegate_1.Delegate);
        yield delegateRepository.save(delegate);
        console.log("User has been saved");
        let savedUser = yield delegateRepository.find();
        console.log("All Users from the db: ", savedUser);
    })).catch(error => console.log(error));
    // res.send(JSON.stringify(req.fields))
});
indexRouter.post('/checkuser', (req, res, next) => {
    console.log(req.body);
    console.log(req.fields);
    res.send(JSON.stringify(req.body));
});
app.use(config_1.default.baseUrl, indexRouter);
