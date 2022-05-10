import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, Validate } from 'class-validator';
import { ParseMongoObjectIdPipe } from 'src/common/pipes/parse-mongo-object-id.pipe';
import { CreateContactDto } from './create-contact.dto';

export class UpdateContactDto extends PartialType(CreateContactDto) {
    @IsNotEmpty()
    @Validate(ParseMongoObjectIdPipe)
    readonly _id: string;
}
