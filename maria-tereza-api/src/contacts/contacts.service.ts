import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserFilterMongoService } from '../common/services/user-filter-mongo/user-filter-mongo.service';
import { Contact, ContactDocument } from './entities/contact.entity';

@Injectable()
export class ContactsService extends UserFilterMongoService<ContactDocument> {
  constructor(@InjectModel(Contact.name) protected readonly model: Model<ContactDocument>) {
    super(model);
  }
}
