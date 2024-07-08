import { Module } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import * as fs from "fs";

@Module({
  providers: [GoodsService],
  controllers: [GoodsController],
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = join('uploads'); // Set your custom path here
          if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads', { recursive: true });
          }
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now();
          const fileExtension = file.originalname.split('.').pop();
          cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExtension}`);
        },
      }),
    }),
    PrismaModule
  ]
})
export class GoodsModule {}
