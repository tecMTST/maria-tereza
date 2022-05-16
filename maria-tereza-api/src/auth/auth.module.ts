import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategyService } from './strategies/jwt-strategy.service';
import { RefreshJwtStrategyService } from './strategies/refresh-jwt-strategy.service';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        forwardRef(() => UsersModule),
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
    providers: [AuthService, JwtStrategyService, RefreshJwtStrategyService],
    controllers: [AuthController]
})
export class AuthModule { } 
