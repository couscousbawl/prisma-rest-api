import { Request, Response } from "express";
import prisma from '../middleware/prisma';
import email from '../utils/email';
import { add, compareAsc } from 'date-fns';
import { TokenType, UserRoles } from '@prisma/client'

const EMAIL_TOKEN_EXPIRATION_MINUTES = 10

interface LoginInput {
  email: string
}

export default class AuthController {
    async login(req: Request, res: Response){
        const { email } = req.body as LoginInput;
        const emailToken = generateEmailToken();
        const tokenExpiration = add(new Date(), { minutes: EMAIL_TOKEN_EXPIRATION_MINUTES })

        try {
            const createdToken = await prisma.token.create({
                data: {
                    emailToken,
                    type: TokenType.EMAIL,
                    expiration: tokenExpiration,
                    user: {
                        connectOrCreate: {
                            create: {
                                email
                            },
                            where: {
                                email
                            }
                        }
                    }
                }
            });
            //send the email token
            //await sendEmailToken(email, emailToken);
            res.status(201).json({
                message: "login OK",
                data: createdToken
            });
        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error!",
                error: error
            });
        }
    }
}

// Generate a random 8 digit number as the email token
function generateEmailToken(): string {
    return Math.floor(10000000 + Math.random() * 90000000).toString()
}