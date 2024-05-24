import { Module } from '@nestjs/common';
import { ImagesModule } from '../images/images.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../../config/config';
import { DatabaseModule } from '../database/database.module';
import { ImageTagModule } from '../image-tag/image-tag.module';
import { TagModule } from '../tags/tag.module';

@Module({
  imports: [
    ImagesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    DatabaseModule,
    ImageTagModule,
    TagModule
  ],
  // controllers: [ImagesController],
  // providers: [ImagesService],
})
export class AppModule {}
