/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response, Router } from 'express';
import { User } from 'src/modules/user/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { Repository } from 'typeorm';
// const router = require("express").Router();
// const passport = require("passport");
@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly UserRepository: Repository<User>,
        private UserService: UserService
    ){}

    async login({
        email,
        name,
        image,
      }: {
        email: string;
        name: string;
        image: string;
      }): Promise<any> {
        const userExists = await this.UserRepository.findOne({
          where:{
            email: email,
          }
        });
        if (!userExists) {
          const newUser = {
            email: email,
            name: name,
            picture: image,
            role: "user"
          }
          await this.UserRepository.save(newUser)
        } else {
          return userExists
        }
      }


}
