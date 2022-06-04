import { Injectable } from '@nestjs/common';
import { DeleteResult } from "mongodb";
import { Model } from 'mongoose';


@Injectable()
export class UserFilterMongoService<T> {
    
    constructor(protected readonly model: Model<T>) { }

    async findById(user: string, _id: string): Promise<T> {
        return this.model.findOne({ _id, user }, {
            user: false,
            createdAt: false,
            updatedAt: false
        }).exec();
    }

    async findAll(user: string): Promise<T[]> {
        return this.model.find({ user }, {
            user: false,
            createdAt: false,
            updatedAt: false
        }).exec();
    }

    async deleteById(user: string, _id: string): Promise<DeleteResult> {
        return this.model.deleteOne({ _id, user }).exec();
    }

    async create(user: string, param: any): Promise<T> {
        return this.model.create({ user, ...param });
    }

    async update(user: string, param: any): Promise<T> {
        const { _id } = param;
        return this.model.findOneAndUpdate({ _id, user }, { $set: param }).exec();
    }
}
