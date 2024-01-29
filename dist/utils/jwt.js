"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.JWT_SECRET || 'secret';
exports.default = {
    sign: (payload) => jsonwebtoken_1.default.sign(payload, SECRET, { expiresIn: '1h', algorithm: 'HS256' }),
    verify: (token) => jsonwebtoken_1.default.verify(token, SECRET),
};
