import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, Validate } from 'class-validator';
import { ParseMongoObjectIdPipe } from 'src/common/pipes/parse-mongo-object-id.pipe';
import { CreateMessageDto } from './create-message.dto';

export class UpdateMessageDto extends PartialType(CreateMessageDto) {
    @IsNotEmpty()
    @Validate(ParseMongoObjectIdPipe)
    readonly _id: string;
}
