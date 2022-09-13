/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
require('dotenv').config();
export const typeormConfig: TypeOrmModuleOptions = {
    type:'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(<string>process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USERNAME,
    password:process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    url:"postgres://antkpnyjwgydja:2ca8548690e04068026013990393463cd75352e6f67d2e1c294377a3486e3ad2@ec2-34-200-205-45.compute-1.amazonaws.com:5432/dco68ip7jgkcbc",
    synchronize: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
}