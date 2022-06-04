import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export type ContactDocument = Contact & Document;


@Schema({
    timestamps: true
})
export class Contact {

    @Prop({ required: true })
    name: string;


    @Prop({
        required: true,
        unique: true,
        match: /\d{2}\d{2}\d{4,5}\d{4}/
    })
    phoneNumber: string;

    @Prop({
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    })
    @Exclude()
    user: User;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);