import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ImageTag } from './image-tag.model';

@Injectable()
export class ImageTagService {
  constructor(
    @InjectModel(ImageTag)
    private imageTag: typeof ImageTag,
  ) {}
  truncate(transaction) {
    return this.imageTag.truncate(transaction);
  }

  create(data: any, transactionHost: any) {
    return this.imageTag.findOrCreate({
      where: {
        imageId: data.imageId,
        tagId: data.tagId,
      },
      transaction: transactionHost.transaction,
    });
  }
}
