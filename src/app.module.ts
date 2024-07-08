import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from "@nestjs-modules/ioredis";
import { CategoriesModule } from './categories/categories.module';
import { GoodsModule } from './goods/goods.module';
import { ServeStaticModule } from "@nestjs/serve-static";

import { join } from "path";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ".env"
        }),
        RedisModule.forRoot({
            type: 'single',
            url: process.env.REDIS_URL
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../uploads')
        }),
        UsersModule,
        AuthModule,
        RedisModule,
        CategoriesModule,
        GoodsModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}