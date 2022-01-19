import { prop, getModelForClass, ReturnModelType, modelOptions, Severity } from "@typegoose/typegoose"

@modelOptions({ options: { allowMixed: Severity.ALLOW} })
export class Notification {
    @prop({ required: true })
    public user_id: string;

    @prop({ required: true })
    public company_id: string;

    @prop({ require: true })
    public type: string;
}

export const NotificationModel = getModelForClass(Notification);