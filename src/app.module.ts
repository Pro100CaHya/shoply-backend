import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ".env"
        }),
        UsersModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}