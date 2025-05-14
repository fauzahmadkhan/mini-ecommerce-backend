import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as bodyParser from 'body-parser';
// import { CronService } from "./shared/cron/cron-service";

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(bodyParser.json({ limit: '500mb' }));
  app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (validationErrors: ValidationError[] = []) => {
      if (validationErrors[0]?.children.length) {
        return new BadRequestException(
          Object.values(validationErrors[0].children[0].constraints)[0],
        );
      } else {
        return new BadRequestException(
          Object.values(validationErrors[0].constraints)[0],
        );
      }
    },
  }));
  
  const config = new DocumentBuilder()
    .setTitle('Mini Ecommerce')
    .setDescription('Mini Ecommerce APIs Documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });
  
  // app.get(CronService);
  
  
  await app.listen(process.env.PORT || 4000);
}

bootstrap();
