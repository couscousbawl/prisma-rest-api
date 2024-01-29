"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
function InitiatePrisma(req, res, next) {
    const prisma = new client_1.PrismaClient();
    next();
}
exports.default = InitiatePrisma;
