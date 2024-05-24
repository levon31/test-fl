import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ImageTag } from './image-tag.model';
import { ImageTagService } from './image-tag.service';
import { ImageTagController } from './image-tag.controller';

@Module({
  imports: [SequelizeModule.forFeature([ImageTag])],
  providers: [ImageTagService],
  exports: [ImageTagService],
  controllers: [ImageTagController],
})
export class ImageTagModule {}
