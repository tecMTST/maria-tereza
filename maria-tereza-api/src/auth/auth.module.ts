import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
import { JwtStrategyService } from './jwt/jwt-strategy.service';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: {
                    expiresIn: '60s',
                    algorithm: 'HS256'
                }
            })
        })
    ],
    exports: [AuthService],
    providers: [AuthService, JwtStrategyService]
})
export class AuthModule { } 
