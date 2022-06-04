import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserFilterMongoService } from 'src/common/services/user-filter-mongo/user-filter-mongo.service';
import { Scheduler, SchedulerDocument } from './entities/scheduler.entity';

@Injectable()
export class SchedulerService extends UserFilterMongoService<SchedulerDocument> {
  constructor(
    @InjectModel(Scheduler.name) protected readonly model: Model<SchedulerDocument>
  ) {
    super(model);
  }

  // async update(user: string, param: UpdateSchedulerDto): Promise<SchedulerDocument> {
  //   const schedule = await this.findById(param._id);
  //   const { sendToContact, sentToContact } = schedule;

  //   const contactInSendList = sendToContact.findIndex((contact) => {
  //     return contact._id == param.sentToContact
  //   });

  //   const contactInSentList = sentToContact.findIndex((contact) => {
  //     return contact._id == param.sentToContact
  //   });

  //   if (contactInSendList >= 0 && contactInSentList < 0) {
  //     return this.model.findByIdAndUpdate(param._id, { $push: { "sentToContact": param.sentToContact } }).exec();
  //   } else {
  //     throw new BadRequestException('Invalid Contact');
  //   }
  // }

  /*
  async findNextMessage(): Promise<SchedulerDocument[]> {
    this.logger.log('findNextMessage');
    return this.model.find({
      when: { $lte: new Date().toISOString() },
      $expr: {
        $lte: [
          { $size: "$sentToContact" },
          { $size: "$sendToContact" }
        ]
      }
    })
      .sort({ when: 1 })
      .limit(1)
      .populate('message')
      .exec();
  }*/

  // @Cron(`0 */5 * * * *`)
  // async handleCron() {
  //   const nextMessage = await this.findNextMessage();
  //   if (nextMessage.length > 0) {
  //     const { message, sendToContact, sentToContact } = nextMessage[0];
  //     const toContact = await this.getContact(sendToContact, sentToContact);
  //     await this.awaitToSend();
  //     await this.sendMessage(message, toContact, nextMessage);
  //   }
  // }

  // private async sendMessage(message: MessageDocument, toContact: Contact, nextMessage: SchedulerDocument[]) {
  //   const _message = { message: message, to: toContact.phoneNumber };
  //   this.logger.log(`sendMessage: ${_message}`);
  //   this.chatGateway.server.emit('message', _message);
  //   await this.update({
  //     _id: nextMessage[0]._id,
  //     sentToContact: toContact
  //   });
  // }

  // private async awaitToSend() {
  //   const seconds = this.randomIntFromInterval(0, 299);
  //   await new Promise(resolve => setTimeout(resolve, seconds * 1000));
  // }

  // private async getContact(sendToContact: ContactDocument[], sentToContact: ContactDocument[]): Promise<Contact> {
  //   const contactId = sendToContact.filter(contact => {
  //     return sentToContact.indexOf(contact) < 0;
  //   })[0];
  //   return this.contactsService.findById(contactId._id);
  // }
}



