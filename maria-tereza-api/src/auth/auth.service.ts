import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UserDocument } from 'src/users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService) { }

    async login(email: string, passwd: string): Promise<any> {
        return this.validateUser(email, passwd)
            .then(async (payload: any) => {
                const { isValid, user, _id } = payload
                if (isValid) {
                    const tokens = await this.getTokens(user);
                    await this.updateRefreshToken(_id, tokens.refreshToken);
                    return tokens
                }
                throw new UnauthorizedException('Invalid Access')
            });
    }

    async logout(email: string): Promise<any> {
        return this.usersService.findByEmail(email).then(async (user: UserDocument) => {
            return this.updateRefreshToken(user._id, null);
        })
    }

    async refreshToken(email: string, refreshToken: string): Promise<any> {
        return this.usersService.findByEmail(email).then(async (user: UserDocument) => {
            if (user.refreshToken === refreshToken) {
                const tokenDecode = await this.jwtService.verifyAsync<UserDocument>(refreshToken, {
                    secret: this.configService.get('JWT_REFRESH_SECRET')
                });
                const { name,email } = tokenDecode;
                const accessToken = await this.jwtService.signAsync({ name, email }, {
                    expiresIn: '60s',
                    secret: this.configService.get('JWT_SECRET')
                })

                return {
                    accessToken,
                    refreshToken
                }
            }
            throw new UnauthorizedException('Invalid Access')
        });
    }

    hashPassword(passwd: string): Promise<string> {
        return hash(passwd, 10);
    }

    private async getTokens(param: any): Promise<{
        accessToken: string,
        refreshToken: string
    }> {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(param, {
                expiresIn: '60s',
                secret: this.configService.get('JWT_SECRET')
            }),
            this.jwtService.signAsync(param, {
                expiresIn: '15m',
                secret: this.configService.get('JWT_REFRESH_SECRET')
            }),
        ]);
        return {
            accessToken,
            refreshToken
        }
    }

    private validatePasswordCredential(newPasswd: string, passwdHash: string): Promise<boolean> {
        return compare(newPasswd, passwdHash);
    }



    private async validateUser(email: string, passwd: string): Promise<any> {
        return this.usersService.findByEmailWithPasswd(email)
            .then(async (user: UserDocument) => {
                const {
                    password,
                    name,
                    email,
                    _id
                } = user;
                const isValid = await this.validatePasswordCredential(passwd, password);
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
    private async updateRefreshToken(_id: any, refreshToken: string) {
        return this.usersService.update({
            _id,
            refreshToken
        })
    }
}
