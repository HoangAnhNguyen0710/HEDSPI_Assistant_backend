/* eslint-disable prettier/prettier */
import { Controller, Get, Post, UseGuards, Req, Res, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthGuard} from '@nestjs/passport';
import { Request, Response, } from 'express';
import passport from "passport";
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  );
  
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    async login(@Body('token') token): Promise<any> {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
  
      const payload = ticket.getPayload();
      const data = await this.authService.login({
        email: payload.email,
        name: payload.name,
        image: payload.picture
      })
      return data;
    }
}
