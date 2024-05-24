import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Image } from './image.model';
import { createFlickr } from 'flickr-sdk';
import { Sequelize } from 'sequelize-typescript';
import { ImageTagService } from '../image-tag/image-tag.service';
import { TagsService } from '../tags/tags.service';

@Injectable()
export class ImagesService implements OnApplicationBootstrap {
  constructor(
    @InjectModel(Image)
    private imageModel: typeof Image,
    private sequelize: Sequelize,
    private imageTagService: ImageTagService,
    private tagService: TagsService,
  ) {}

  onApplicationBootstrap() {
    console.log(`The module has been initialized.`);
    this.bulkInsertImages();
  }

  async findAndCountAll(page): Promise<{ rows: Image[]; count: number }> {
    const offset = (page - 1) * 10;
    return this.imageModel.findAndCountAll({
      limit: 10,
      offset,
    });
  }

  async getAllItems(): Promise<any> {
    const { flickr } = createFlickr(process.env.FLICKR_TOKEN);
    const {
      photos: { photo },
    } = await flickr('flickr.photos.search', {
      page: '1',
      per_page: '500',
      privacy_filter: '1',
      tags: 'cat',
      extras: 'tags,date_upload,url_m',
    });

    return photo.map((item) => ({
      publishedDate: new Date(item.dateupload * 1000).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      // publishedDate: new Date(item.dateupload),
      url: item.url_m,
      tags: item.tags,
    }));
  }

  async bulkInsertImages(): Promise<any> {
    const images = await this.getAllItems();

    try {
      await this.sequelize.transaction(async (t) => {
        const transactionHost = { transaction: t };

        // await this.imageTagService.truncate(transactionHost);
        // await this.imageModel.truncate(transactionHost);
        // await this.tagService.truncate(transactionHost);
        for await (const element of images) {
          const { tags, ...rest } = element;
          const item = await this.imageModel.create(rest, transactionHost);
          const tagsArray = tags.split(' ').filter(Boolean);
          const uniqueTags = Array.from(new Set(tagsArray));
          const items = await Promise.all(
            uniqueTags.map((tag) =>
              this.tagService.create({ name: tag }, transactionHost),
            ),
          );
          // @ts-ignore
          const ids = items.map(({ id }) => id);
          ids.map((id) => {
            this.imageTagService.create(
              { imageId: item.id, tagId: id },
              transactionHost,
            );
          });
        }
      });
    } catch (err) {
      console.log('error', err);
    }
  }
}
