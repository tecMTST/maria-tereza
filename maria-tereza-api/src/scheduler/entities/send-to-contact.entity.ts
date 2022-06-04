import { Prop, Schema } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { ContactDocument } from '../../contacts/entities/contact.entity';

export type SendToContactDocument = SendToContact & Document;

@Schema()
export class SendToContact {

    @Prop({ default: false })
    sended: boolean;

    @Prop({
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact'
    })
    contact: ContactDocument;
}