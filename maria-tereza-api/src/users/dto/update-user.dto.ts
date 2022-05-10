import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, Validate } from 'class-validator';
import { CreateUserDto } from './create-User.dto';
import { ParseMongoObjectIdPipe } from '../../common/pipes/parse-mongo-object-id.pipe';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNotEmpty()
    @Validate(ParseMongoObjectIdPipe)
    readonly _id: string;
}
