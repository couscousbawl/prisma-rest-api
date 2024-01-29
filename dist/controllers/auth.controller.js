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
const date_fns_1 = require("date-fns");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = __importDefault(require("../utils/jwt"));
const API_TOKEN_EXPIRATION_MINUTES = 1000;
class AuthController {
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const tokenExpiration = (0, date_fns_1.add)(new Date(), { minutes: API_TOKEN_EXPIRATION_MINUTES });
            if (!email || !password) {
                res.status(401).json({
                    message: "Some required fields are missing",
                    data: req.body
                });
                return next();
            }
            const user = yield prisma_1.default.user.findUnique({ where: { email } });
            if (!user) {
                res.status(404).json({
                    message: "User not Found",
                    email: email
                });
                return next();
            }
            const isValidPassword = yield bcryptjs_1.default.compare(password, user.password);
            if (!isValidPassword) {
                res.status(401).json({
                    message: "Invalid Password",
                    data: isValidPassword
                });
                return next();
            }
            const token = jwt_1.default.sign({ id: user.id, email: user.email });
            res.status(201).json({
                message: "login OK",
                user: user.id,
                token: token
            });
            //In case of email token, create the token in the database
            // try {
            //     const createdToken = await prisma.token.create({
            //         data: {
            //             emailToken: token,
            //             type: TokenType.API,
            //             expiration: tokenExpiration,
            //             user: {
            //                 connect: {
            //                     email: email
            //                 }
            //             }
            //         },
            //         select: {
            //             emailToken: true,
            //             user: {
            //                 select: {
            //                     email: true
            //                 }
            //             }
            //         }
            //     });
            //     // //send the email token
            //     //await sendEmailToken(email, emailToken);
            //     res.status(201).json({
            //         message: "login OK",
            //         data: createdToken
            //     });
            // } catch (error) {
            //     res.status(500).json({
            //         message: "Internal Server Error!",
            //         error: error
            //     });
            // }
        });
    }
}
exports.default = AuthController;
// Generate a random 8 digit number as the email token
function generateEmailToken() {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
}
