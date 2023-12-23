import { NextFunction, Request, Response } from "express";
import prisma from '../lib/prisma';
import email from '../utils/email';
import { add, compareAsc } from 'date-fns';
import { TokenType, UserRoles } from '@prisma/client'
import { StatusCodes } from "http-status-codes";
import bcrypt from 'bcryptjs';
import jwt from "../utils/jwt";

const API_TOKEN_EXPIRATION_MINUTES = 1000

interface LoginInput {
    email: string,
    password: string
}

export default class AuthController {
    async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body as LoginInput;
        const tokenExpiration = add(new Date(), { minutes: API_TOKEN_EXPIRATION_MINUTES });

        if (!email || !password) {
            res.status(401).json({
                message: "Some required fields are missing",
                data: req.body
            });
            return next();
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            res.status(404).json({
                message: "User not Found",
                email: email
            });
            return next();
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            res.status(401).json({
                message: "Invalid Password",
                data: isValidPassword
            });
            return next();
        }

        const token = jwt.sign({ id: user.id, email: user.email });

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
    }
}

// Generate a random 8 digit number as the email token
function generateEmailToken(): string {
    return Math.floor(10000000 + Math.random() * 90000000).toString()
}