import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    async generateJWT(param: any): Promise<string> {
        return this.jwtService.sign(param);
    }

    hashPassword(passwd: string): Promise<string> {
        return hash(passwd, 10);
    }

    validatePasswordCredential(newPasswd: string, passwdHash: string): Promise<boolean> {
        return compare(newPasswd, passwdHash);
    }
}
