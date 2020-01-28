"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
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
app.use((req, res, next) => {
    console.log("server started successfully");
    next();
});
indexRouter.get("/", (req, res) => {
    res.send("Working on the server");
});
indexRouter.get("/okay", (req, res) => {
    res.send("yeah!! server working");
});
indexRouter.get("/chiamaka", (req, res) => {
    res.send("Chiamaka is an awesome lady");
});
indexRouter.get("/work", (req, res) => {
    res.send("Work is great!");
});
app.use(config_1.default.baseUrl, indexRouter);
