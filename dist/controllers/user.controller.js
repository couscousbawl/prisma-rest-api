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
const prisma_1 = __importDefault(require("../lib/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserController {
    //create a new user
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const passwordHash = yield bcryptjs_1.default.hash(req.body.password, 10);
                const createdUser = yield prisma_1.default.user.create({
                    data: {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: passwordHash,
                        social: req.body.social
                    }
                });
                res.status(201).json({
                    message: "create OK",
                    data: createdUser
                });
            }
            catch (err) {
                res.status(500).json({
                    message: "Internal Server Error!"
                });
            }
        });
    }
    //update an existing user
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const updateUserData = req.body.data;
                const updatedUser = yield prisma_1.default.user.update({
                    where: {
                        id: userId
                    },
                    data: updateUserData
                });
                res.status(201).json({
                    message: "update OK",
                    data: updatedUser
                });
            }
            catch (err) {
                res.status(500).json({
                    message: "Internal Server Error!"
                });
            }
        });
    }
    // get all users
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield prisma_1.default.user.findMany({
                    select: {
                        email: true,
                        firstName: true,
                        lastName: true,
                        social: true
                    }
                });
                res.status(201).json({
                    message: "getAllUsers OK",
                    data: users
                });
            }
            catch (err) {
                res.status(500).json({
                    message: "Internal Server Error!"
                });
            }
        });
    }
    //find a user by ID
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            try {
                const user = yield prisma_1.default.user.findUnique({
                    where: {
                        id: userId
                    }
                });
                if (!user) {
                    res.status(404).json({
                        message: "User not found!"
                    });
                }
                else {
                    res.status(201).json({
                        message: "findUserById OK",
                        data: user
                    });
                }
            }
            catch (err) {
                res.status(500).json({
                    message: "Internal Server Error!"
                });
            }
        });
    }
    // Delete a specific user
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            try {
                const user = yield prisma_1.default.user.delete({
                    where: {
                        id: userId
                    }
                });
                if (!user) {
                    res.status(404).json({
                        message: "User not found!"
                    });
                }
                else {
                    res.status(201).json({
                        message: "deleteUser OK",
                        data: user
                    });
                }
            }
            catch (err) {
                res.status(500).json({
                    message: "Internal Server Error!"
                });
            }
        });
    }
}
exports.default = UserController;
