import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserFilterMongoService } from 'src/common/services/user-filter-mongo/user-filter-mongo.service';
import { Message, MessageDocument } from './entities/message.entity';

@Injectable()
export class MessagesService extends UserFilterMongoService<MessageDocument> {
  constructor(@InjectModel(Message.name) protected readonly model: Model<MessageDocument>) {
    super(model);
  }

  async findById(_id: string, userId: string): Promise<MessageDocument> {
    return this.model.findOne({ _id, user: userId }, {
      user: false,
      createdAt: false,
      updatedAt: false
    }).populate('options.redirect').exec();
  }
}