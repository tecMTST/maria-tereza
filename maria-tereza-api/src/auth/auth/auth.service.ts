import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService) { }

    async getTokens(param: any): Promise<{
        accessToken: string,
        refreshToken: string
    }> {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(param, {
                expiresIn: '60s',
                secret: this.configService.get('JWT_SECRET')
            }),
            this.jwtService.signAsync(param, {
                expiresIn: '60m',
                secret: this.configService.get('JWT_REFRESH_SECRET')
            })
        ]);
        return {
            accessToken,
            refreshToken
        }
    }


    hashPassword(passwd: string): Promise<string> {
        return hash(passwd, 10);
    }

    validatePasswordCredential(newPasswd: string, passwdHash: string): Promise<boolean> {
        return compare(newPasswd, passwdHash);
    }

    async refreshToken(token: string): Promise<{
        accessToken: string,
        refreshToken: string
    }> {
        const tokenDecode = await this.jwtService.verifyAsync(token, {
            secret: this.configService.get('JWT_REFRESH_SECRET')
        });

        const accessToken = await this.jwtService.signAsync(tokenDecode, {
            secret: this.configService.get('JWT_SECRET')
        })
        return {
            accessToken,
            refreshToken: token
        }
    }
}
