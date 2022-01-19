import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as mongoose from 'mongoose';

async function bootstrap() {
  let dbhost = '127.0.0.1'
  if(process.env.DB_HOST){
    dbhost = process.env.DB_HOST
  }
  await mongoose.connect('mongodb://'+dbhost+':27017/notification');
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
