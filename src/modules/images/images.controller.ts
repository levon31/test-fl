import { Controller, Get, Query } from '@nestjs/common';
import { ImagesService } from './images.service';
import { Image } from './image.model';

@Controller()
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  getImages(@Query() query): Promise<{ rows: Image[]; count: number }> {
    return this.imagesService.findAndCountAll(parseInt(query.page));
  }
}
