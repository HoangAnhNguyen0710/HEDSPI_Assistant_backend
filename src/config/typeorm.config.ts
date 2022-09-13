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
    url:process.env.POSTGRES_URL,
    synchronize: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
}