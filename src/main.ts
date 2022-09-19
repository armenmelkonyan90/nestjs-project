import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { STATUS_CODES } from 'http';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {
      if (errors.length) {
        let messages = [];
       
        for (let item of errors) {
          let single = {};
          let constraints = Object.values(item.constraints)
          single[item.property] = constraints;
          messages.push(single);
        }

        throw new BadRequestException({
          error: "Unprocessible entity",
          messages,
          code: 422
        })
      }
    },
  }));
  await app.listen(3000);
}
bootstrap();
