import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {MicroserviceOptions, Transport} from '@nestjs/microservices';

async function bootstrap() {
  
  /* const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'main_queue',
      queueOptions: {
        durable: false
      },
    },
  });

  //Necessário para trabalhar com validação no Nest
  //app.useGlobalPipes(new ValidationPipe());

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(); */


  const app = await NestFactory.create(AppModule);

  //const configService = app.get(ConfigService);

  /* const user = configService.get('RABBITMQ_USER');
  const password = configService.get('RABBITMQ_PASSWORD');
  const host = configService.get('RABBITMQ_HOST');
  const queueName = configService.get('RABBITMQ_QUEUE_NAME'); */

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'main_queue',
      queueOptions: {
        durable: false
      },
    },
  });

  //Necessário para trabalhar com validação no Nest
  app.useGlobalPipes(new ValidationPipe());

  await app.startAllMicroservices();

  await app.listen(3000);

}
bootstrap();
