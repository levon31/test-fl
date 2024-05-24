import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Image } from './image.model';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';

@Module({
  imports: [SequelizeModule.forFeature([Image])],
  providers: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
