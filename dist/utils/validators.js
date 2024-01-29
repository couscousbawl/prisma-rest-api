"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInputValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const userInputValidator = () => {
    return joi_1.default.object({
        firstName: joi_1.default.string().alter({
            create: (schema) => schema.required(),
            update: (schema) => schema.optional(),
        }),
        lastName: joi_1.default.string().alter({
            create: (schema) => schema.required(),
            update: (schema) => schema.optional(),
        }),
        email: joi_1.default.string()
            .email()
            .alter({
            create: (schema) => schema.required(),
            update: (schema) => schema.optional(),
        }),
        social: joi_1.default.object({
            facebook: joi_1.default.string().optional(),
            twitter: joi_1.default.string().optional(),
            github: joi_1.default.string().optional(),
            website: joi_1.default.string().optional(),
        }).optional(),
    });
};
exports.userInputValidator = userInputValidator;
