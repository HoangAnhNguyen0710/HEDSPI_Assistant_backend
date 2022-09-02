/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');
const passportStrategy = require('./config/passport.config');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(
  //   cookieSession({
  //     name: "session",
  //     keys: "hedspi_web",
  //     maxAge: 24 * 60 * 60 * 100,
  //   })
  // )
  // app.use(passport.initialize());
  // app.use(passport.session());
  // app.use(cors({
	// 	origin: "http://localhost:3000",
	// 	methods: "GET,POST,PUT,DELETE",
	// 	credentials: true,
	// }));
  app.enableCors({
    origin: 'http://localhost:3000'
  })
  // app.use(cors());


  await app.listen(5000);
}
bootstrap();
