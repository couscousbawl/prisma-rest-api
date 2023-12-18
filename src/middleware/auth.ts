import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from '../utils/jwt';

const authorize = (req: Request, res: Response, next: NextFunction) => {

  try {
    const token = req.headers.authorization!.split(' ')[1];
    const decode = jwt.verify(token);
    req.body.user = decode;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized!",
      data: req.body
  });
  }
};

export default authorize;