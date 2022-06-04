import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Message, MessageDocument } from '../../messages/entities/message.entity';
import { SendToContact } from "./send-to-contact.entity";
import { User } from '../../users/entities/user.entity';

export type SchedulerDocument = Scheduler & Document;

@Schema({
    timestamps: true
})
export class Scheduler {

    @Prop({ required: true })
    when: Date;

    @Prop({
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: Message.name
    })
    message: MessageDocument;


    @Prop([{ type: SendToContact }])
    sendToContact?: SendToContact[];

    @Prop({
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    })
    @Exclude()
    user: User;

}

export const SchedulerSchema = SchemaFactory.createForClass(Scheduler);