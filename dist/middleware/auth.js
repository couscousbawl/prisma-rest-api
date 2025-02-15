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
const jwt_1 = __importDefault(require("../utils/jwt"));
const authorize = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt_1.default.verify(token);
        req.body.user = decode;
        // In case of email token Fetch the token from DB to verify it's valid
        // const fetchedToken = await prisma.token.findUnique({
        //   where: {
        //     emailToken: token,
        //   },
        //   include: {
        //     user: true,
        //   },
        // })
        next();
    }
    catch (error) {
        res.status(401).json({
            message: "Unauthorized!",
            data: req.body
        });
    }
});
exports.default = authorize;
