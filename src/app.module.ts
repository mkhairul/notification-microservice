import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationService } from './services/notification/notification.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, NotificationService],
})
export class AppModule {}
