/* eslint-disable prettier/prettier */
import { Body, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';


const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use (@Body('token') token, res: Response, next: NextFunction) {
    // const ticket = await client.verifyIdToken({
    //   idToken: token,
    //   audience: process.env.GOOGLE_CLIENT_ID,
    // }).catch((err)=> console.log(err));
    // console.log("ticket:" + ticket);
    // client.forceRefreshOnFailure = true;
    next();
  }
}
