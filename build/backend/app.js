"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const port = process.env.PORT || 3000;
const hostname = '127.0.0.1';
const http_1 = require("http");
const app_1 = require("./routes/app");
const server = http_1.createServer(app_1.app);
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
