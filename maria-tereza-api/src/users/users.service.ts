import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult } from "mongodb";
import { Model } from 'mongoose';
import { AuthService } from './../auth/auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
    protected readonly logger = new Logger(UsersService.name);

    constructor(
        @InjectModel(User.name) protected readonly model: Model<UserDocument>,
        private authService: AuthService
    ) { }


    async findById(_id: string): Promise<UserDocument> {
        this.logger.log(`findById: ${_id}`);
        return this.model.findById(_id).exec();
    }

    async findAll(): Promise<UserDocument[]> {
        this.logger.log('findAll');
        return this.model.find().exec();
    }

    async findByEmail(email: string): Promise<UserDocument> {
        this.logger.log(`findOne: ${email}`);
        return this.model.findOne({ email }).exec();
    }

    async deleteById(_id: string): Promise<DeleteResult> {
        this.logger.log(`deleteById: ${_id}`);
        return this.model.deleteOne({ _id }).exec();
    }

    async create(param: CreateUserDto): Promise<UserDocument> {
        const hash = await this.authService.hashPassword(param.password);
        const createObj = { ...param, password: hash };
        this.logger.log(`create: ${JSON.stringify(createObj)}`);
        return this.model.create(createObj);
    }

    async update(param: UpdateUserDto): Promise<UserDocument> {
        let updateObject = { ...param };
        if (!!param.password) {
            updateObject['password'] = await this.authService.hashPassword(param.password)
        }
        this.logger.log(`update:  ${JSON.stringify(updateObject)}`);
        return this.model.findByIdAndUpdate(param._id, { $set: updateObject }).exec();
    }
    async updateRefreshToken(_id: string, refreshToken: string): Promise<UserDocument> {
        this.logger.log(`updateRefreshToken`);
        return await this.update({
            _id,
            refreshToken
        })
    }

    private async validateUser(email: string, passwd: string): Promise<any> {
        return this.model
            .findOne({ email })
            .populate('password')
            .exec()
            .then(async (user: UserDocument) => {
                const {
                    password,
                    name,
                    email,
                    _id
                } = user;
                const isValid = await this.authService.validatePasswordCredential(passwd, password);
                return {
                    isValid,
                    user: {
                        name,
                        email
                    },
                    _id
                }
            });
    }

    async login(email: string, passwd: string): Promise<any> {
        return this.validateUser(email, passwd)
            .then(async (payload: any) => {
                const { isValid, user, _id } = payload
                if (isValid) {
                    const tokens = await this.authService.getTokens(user);
                    await this.updateRefreshToken(_id, tokens.refreshToken);
                    return tokens
                }
                throw new UnauthorizedException('Invalid Access')
            });
    }

    async logout(email: string): Promise<any> {
        return this.findByEmail(email).then(async (user: UserDocument) => {
            return this.updateRefreshToken(user._id, null);
        })
    }

    async refreshToken(email: string, refreshToken: string): Promise<any> {
        return this.findByEmail(email).then(async (user: UserDocument) => {
            if (user.refreshToken === refreshToken) {
                const tokens = await this.authService.refreshToken(refreshToken);
                return tokens;
            }
            throw new UnauthorizedException('Invalid Access')
        });
    }
}
