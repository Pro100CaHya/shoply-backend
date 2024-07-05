import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from "@nestjs-modules/ioredis";
import { CategoriesModule } from './categories/categories.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ".env"
        }),
        RedisModule.forRoot({
            type: 'single',
            url: process.env.REDIS_URL
        }),
        UsersModule,
        AuthModule,
        RedisModule,
        CategoriesModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}