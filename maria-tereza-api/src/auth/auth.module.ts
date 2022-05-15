import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
import { JwtStrategyService } from './jwt/jwt-strategy/jwt-strategy.service';
import { RefreshJwtStrategyService } from './jwt/refresh-jwt-strategy/refresh-jwt-strategy.service';

@Module({
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            useFactory: async () => ({
                signOptions: {
                    algorithm: 'HS256'
                }
            })
        })
    ],
    exports: [AuthService],
    providers: [AuthService, JwtStrategyService, RefreshJwtStrategyService]
})
export class AuthModule { } 
