import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, Validate } from 'class-validator';
import { CreateSchedulerDto } from './create-scheduler.dto';
import { ContactDocument } from '../../contacts/entities/contact.entity';
import { ParseMongoObjectIdPipe } from 'src/common/pipes/parse-mongo-object-id.pipe';

export class UpdateSchedulerDto extends PartialType(CreateSchedulerDto) {
    @IsNotEmpty()
    @Validate(ParseMongoObjectIdPipe)
    readonly _id: string;

    @IsNotEmpty()
    readonly sentToContact: ContactDocument;
}
