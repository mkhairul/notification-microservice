import { Controller, Get, Post, Param, Res, HttpStatus, BadRequestException, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { NotificationService } from './services/notification/notification.service';
import { SendNotificationDto } from './dto/sendNotification.dto'
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly notificationService: NotificationService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('notifications/:uid/:cid')
  async getNotifications(@Res() res: Response, @Param('uid') user_id:string, @Param('cid') company_id: string): Promise<any> {
    let result;
    try{
      result = await this.notificationService.getUserNotifications(user_id, company_id)
    } catch (e){
      throw new BadRequestException(e.message)
    }
    res.status(HttpStatus.OK).json(result);
  }

  @Post('notifications')
  async sendNotifications(@Res() res: Response, @Body() sendNotificationDto: SendNotificationDto): Promise<any> {
    try {
      await this.notificationService.sendNotification(sendNotificationDto);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
    
    let result = {
      status: HttpStatus.OK,
      message: 'Notification Sent',
    };
    res.status(HttpStatus.OK).json(result);
  }
}
