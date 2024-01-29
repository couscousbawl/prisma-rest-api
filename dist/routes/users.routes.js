"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_1 = __importDefault(require("../middleware/auth"));
class UsersRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.user = new user_controller_1.default();
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.post('/create', this.user.create); // create a new user
        this.router.get('/:id', this.user.getUserById); // get a user by ID
        this.router.delete('/:id', this.user.deleteUser); // delete a specific user
        this.router.put('/:id', auth_1.default, this.user.update); // update a specific user
        this.router.get('', this.user.getAllUsers); // get all users
    }
}
exports.default = new UsersRoutes().router;
