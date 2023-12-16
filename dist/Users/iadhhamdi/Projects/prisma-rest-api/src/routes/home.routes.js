"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//import { welcome } from "../controllers/home.controller";
class HomeRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get("/", (req, res) => {
            res.send('Welcome to Express & TypeScript API Server').status(200);
        });
    }
}
exports.default = new HomeRoutes().router;
