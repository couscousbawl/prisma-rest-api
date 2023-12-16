"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class StatusRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get("/status", (req, res) => {
            res.send('status').status(200);
        });
    }
}
exports.default = new StatusRoutes().router;
