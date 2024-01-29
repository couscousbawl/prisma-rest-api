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
const mail_1 = __importDefault(require("@sendgrid/mail"));
class email {
    sendEmailToken() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!process.env.SENDGRID_API_KEY) {
                console.log(`The SENDGRID_API_KEY env var must be set, otherwise the API won't be able to send emails.`, `Using debug mode which logs the email tokens instead.`);
                return debugSendEmailToken;
            }
            else {
                mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
                return sendEmailToken;
            }
        });
    }
}
exports.default = email;
function sendEmailToken(email, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const msg = {
            to: email,
            from: 'EMAIL_ADDRESS_CONFIGURED_IN_SEND_GRID@email.com',
            subject: 'Login token for the modern backend API',
            text: `The login token for the API is: ${token}`,
        };
        yield mail_1.default.send(msg);
    });
}
function debugSendEmailToken(email, token) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`email token for ${email}: ${token} `);
    });
}
