import { NextFunction, Request, Response } from 'express';
import jwt from '../utils/jwt';
import prisma from '../lib/prisma';

const authorize = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const token = req.headers.authorization!.split(' ')[1];
    const decode = jwt.verify(token);
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
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized!",
      data: req.body
  });
  }
};

export default authorize;