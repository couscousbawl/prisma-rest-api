import { Request, Response } from "express";
import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';

interface UserInput {
    firstName: string
    lastName: string
    email: string
    password: string
    social: {
        facebook?: string
        twitter?: string
        github?: string
        website?: string
    }
}

export default class UserController {
    //create a new user
    async create(req: Request, res: Response) {
        try {
            const passwordHash = await bcrypt.hash(req.body.password, 10)
            const createdUser = await prisma.user.create({
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
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }
    //update an existing user
    async update(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            const updateUserData = req.body.data as Partial<UserInput>;

            const updatedUser = await prisma.user.update({
                where: {
                    id: userId
                },
                data: updateUserData
            });
            res.status(201).json({
                message: "update OK",
                data: updatedUser
            });
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }
    // get all users
    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await prisma.user.findMany();

            res.status(201).json({
                message: "getAllUsers OK",
                data: users
            })
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }
    //find a user by ID
    async getUserById(req: Request, res: Response) {
        const userId = req.params.id;
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: userId
                }
            });
            if (!user){
                res.status(404).json({
                    message: "User not found!"
                });
            }else{
                res.status(201).json({
                    message: "findUserById OK",
                    data: user
                });
            }
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }
    // Delete a specific user
    async deleteUser(req: Request, res: Response) {
        const userId = req.params.id;
        try {
            const user = await prisma.user.delete({
                where: {
                    id: userId
                }
            });
            if (!user){
                res.status(404).json({
                    message: "User not found!"
                });
            }else{
                res.status(201).json({
                    message: "deleteUser OK",
                    data: user
                });
            }
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }
}