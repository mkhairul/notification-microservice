import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from './notification.service';
import { SendNotificationDto } from 'src/dto/sendNotification.dto';
import { NotificationModel } from 'src/models/notification.model';

jest.mock('src/models/notification.model', () => {
  const mockModel = { create: jest.fn() };
  return {}
})

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationService],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send email (output to console)', () => {
    const consoleLogMock = jest.spyOn(console, 'log').mockImplementation()
    service.sendToEmail({ user_id: '1', company_id: '1', notification_type: 'happy-birthday' });
    expect(consoleLogMock).toHaveBeenCalledTimes(2);
    consoleLogMock.mockRestore();
  })

  it('should throw an error for invalid notification type', () => {
    expect(() => {
      service.validType('some-event')
    }).toThrow();
  })

  it('should return itself for valid notification type', () => {
    expect(service.validType('happy-birthday')).toBe(service);
  })

  it('matches one of the two channels available', () => {
    
  })


});
