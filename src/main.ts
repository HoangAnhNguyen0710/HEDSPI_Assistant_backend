/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// const passport = require('passport');
const cookieSession = require('cookie-session');
// const passportStrategy = require('./config/passport.config');
const bodyParser = require('body-parser');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cookieSession({
      name: "session",
      keys: "hedspi_web",
      maxAge: 24 * 60 * 60 * 100,
    })
  )
  // app.use(passport.initialize());
  // app.use(passport.session());
  // app.use(cors({
	// 	origin: "https://hedspi-assistant.vercel.app/",
	// 	methods: "GET,POST,PUT,DELETE",
	// 	credentials: true,
	// }));
  app.use(bodyParser({limit: '50mb'}));
  // {
  //   origin: 'http://localhost:3000'
  // }
  app.enableCors();
  await app.listen(5000);
  console.log(process.env);
}
bootstrap();
