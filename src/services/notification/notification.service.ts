import { Injectable } from '@nestjs/common';
import { NotificationModel } from 'src/models/notification.model';
import { NotificationType } from 'src/interfaces/notificationtype.interface'
import { SendNotificationDto } from 'src/dto/sendNotification.dto';
import { User } from 'src/interfaces/user.interface';

const users: User[] = [
    {
        user_id: '1',
        firstname: 'Khairul',
        lastname: 'Anuar',
        company_id: '1',
        company: 'MK LLC'
    },
    {
        user_id: '2',
        firstname: 'Ahmad',
        lastname: 'Hafiz',
        company_id: '1',
        company: 'MK LLC'
    },
]

@Injectable()
export class NotificationService {

    public async getUserNotifications(user_id: string, company_id: string): Promise<any>{
        const docs = await NotificationModel.findOne({ user_id: user_id, company_id: company_id}).select('user_id company_id type');
        return docs
    }

    /**
     * @returns The notification types.
     */
    public getNotificationType(): NotificationType[] {
        let notificationTypes: NotificationType[] = [
            { type: 'leave-balance-reminder', channel: ['ui'] },
            { type: 'monthly-payslip', channel: ['email']},
            { type: 'happy-birthday', channel: ['email', 'ui']}
        ]
        return notificationTypes;
    }

    /**
     * Given a notification type, return the channel(s) that the notification should be sent to.
     * @param {string} type - string - The type of notification you want to send.
     * @returns The channel that the notification type is associated with.
     */
    public getChannelFromType(type: string): string[] {
        let notificationTypes: NotificationType[] = this.getNotificationType();
        let result = notificationTypes.find(x => x.type === type)
        return result.channel
    }

    /**
     * @param {string} type - string - The type of notification to be displayed.
     * @returns The NotificationService object.
     */
    public validType(type: string): NotificationService {
        let notificationTypes: NotificationType[] = this.getNotificationType();
        let result = notificationTypes.find(x => x.type === type)
        if(result === undefined){ throw new Error('Invalid Notification Type') }
        return this;
    }

    /**
     * @param {SendNotificationDto} data - SendNotificationDto
     * @returns - true: if the notification exists
     *     - false: if the notification does not exist
     */
    public async isSubscribed(data: SendNotificationDto): Promise<boolean>{
        // Check if it exists in notification collection
        const docs = await NotificationModel.findOne({ user_id: data.user_id, company_id: data.company_id, type: data.notification_type});
        let result: boolean = (docs) ? true:false
        return result;
    }

    /**
     * @param {SendNotificationDto} data - SendNotificationDto
     * @returns The notification channel that was created.
     */
    public async subscribeToNotificationChannel(data: SendNotificationDto): Promise<any>{
        return await NotificationModel.create({
            user_id: data.user_id,
            company_id: data.company_id,
            type: data.notification_type
        });
    }

    /**
     * Given a notification type, return true if the notification type has a UI channel.
     * @param {string} type - string - The type of notification.
     * @returns The function returns a boolean value.
     */
    public haveUIChannel(type: string): boolean{
        let notificationTypes: NotificationType[] = this.getNotificationType();
        let result = notificationTypes.find(x => x.type === type)
        if(result.channel.includes('ui')){
            return true
        }
    }

    /**
     * Given a notification type, return true if the notification type has an email channel.
     * @param {string} type - string - The type of notification you want to check for.
     * @returns The function is returning the result of the find method.
     */
    public haveEmailChannel(type: string): boolean{
        let notificationTypes: NotificationType[] = this.getNotificationType();
        let result = notificationTypes.find(x => x.type === type)
        if(result.channel.includes('email')){
            return true
        }
    }

    /**
     * Sends Email (in this case, to console)
     * @param {SendNotificationDto} data - SendNotificationDto
     * @returns None
     */
    public sendToEmail(data: SendNotificationDto) {
        // retrieve user or throw an error
        let user = users.find(x => x.user_id === data.user_id && x.company_id === data.company_id)
        if(user === undefined){ throw new Error('Unknown user')}

        // send email
        console.log(`Subject: Happy Birthday ${user.firstname}`)
        console.log(`Content: ${user.company} is wishing you a happy birthday!`)
    }

    public sendToUI(): void {

    }

    public async sendNotification(data: SendNotificationDto): Promise<any>{

        if(this.haveUIChannel(data.notification_type)){
            if(await this.isSubscribed(data) === false){
                let result = await this.subscribeToNotificationChannel(data);
            }
            this.sendToUI()
        }

        if(this.haveEmailChannel(data.notification_type)){
            this.sendToEmail(data);
        }

        return true;
    }
}
