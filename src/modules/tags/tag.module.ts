import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tag } from './tag.model';
import { TagsController } from './tags.controller';

@Module({
  imports: [SequelizeModule.forFeature([Tag])],
  providers: [TagsService],
  exports: [TagsService],
  controllers: [TagsController],
})
export class TagModule {}
