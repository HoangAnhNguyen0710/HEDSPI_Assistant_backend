/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    if(!token) return res.status(401).send("Error ! Unauthorized");
    try {
    const decoded =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    // console.log(decoded);
    next();
    } catch (error) {
        console.log(error)
        res.sendStatus(403)
    }
    console.log(req.headers);
    next();
  }
}
