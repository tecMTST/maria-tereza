import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult } from "mongodb";
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
    protected readonly logger = new Logger(UsersService.name);

    constructor(
        @InjectModel(User.name) protected readonly model: Model<UserDocument>,
        @Inject(forwardRef(() => AuthService))
        private authService: AuthService
    ) { }


    async findById(_id: string): Promise<UserDocument> {
        return this.model.findById(_id).exec();
    }

    async findAll(): Promise<UserDocument[]> {
        return this.model.find().exec();
    }

    async findByEmail(email: string): Promise<UserDocument> {
        return this.model.findOne({ email }).exec();
    }

    async findByEmailWithPasswd(email: string): Promise<UserDocument> {
        return this.model.findOne({ email }).populate('password').exec();
    }

    async deleteById(_id: string): Promise<DeleteResult> {
        return this.model.deleteOne({ _id }).exec();
    }

    async create(param: CreateUserDto): Promise<UserDocument> {
        const hash = await this.authService.hashPassword(param.password);
        const createObj = { ...param, password: hash };
        return this.model.create(createObj);
    }

    async update(param: UpdateUserDto): Promise<UserDocument> {
        let updateObject = { ...param };
        if (!!param.password) {
            updateObject['password'] = await this.authService.hashPassword(param.password)
        }
        return this.model.findByIdAndUpdate(param._id, { $set: updateObject }).exec();
    }
}
