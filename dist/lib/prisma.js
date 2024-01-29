"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
let prisma;
if (process.env.NODE_ENV === 'production') {
    prisma = new client_1.PrismaClient();
    prisma.$connect();
}
else {
    if (!global.__db) {
        global.__db = new client_1.PrismaClient();
        global.__db.$connect();
    }
    prisma = global.__db;
}
exports.default = prisma;
