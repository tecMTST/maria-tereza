import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export type MessageDocument = Message & Document;

@Schema({
    timestamps: true
})
export class Message {

    @Prop({ required: true })
    message: string;
    
    @Prop({
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    })
    @Exclude()
    user: User;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

