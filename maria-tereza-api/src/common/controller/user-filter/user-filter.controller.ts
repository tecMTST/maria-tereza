import { Request } from 'express';
import { UsersService } from 'src/users/users.service';

export class UserFilterController {
    constructor(private readonly usersService: UsersService) { }
    
    async getUserId(req: Request): Promise<string> {
        const { user } = req;
        const { id } = await this.usersService.findByEmail(user['email']);
        return id;
    }
}
