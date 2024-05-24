import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tag } from './tag.model';
import { ImageTag } from '../image-tag/image-tag.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag)
    private tag: typeof Tag,
  ) {}
  async create(data: any, transaction) {
    const [tag] = await this.tag.findOrCreate({
      where: { name: data.name },
      transaction: transaction.transaction,
    });

    return tag;
  }

  truncate(transaction: any) {
    return this.tag.truncate(transaction);
  }

  findFavorites() {
    return this.tag.findAll({
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.col('imageTags.tagId')), 'tagCount'], // Use COUNT function with col()
        [Sequelize.col('Tag.name'), 'name'],
      ],
      include: [{
        model: ImageTag,
        required: true, // Perform an inner join
        as: 'imageTags', // Alias for the join table
        attributes: [], // Exclude imageTag attributes (optional)
      }],
      subQuery: false,
      group: ['imageTags.tagId'], // Group by tagId
      order: [[Sequelize.col('tagCount'), 'DESC']], // Order by tagCount descending
      limit: 10, // Limit the results
    })
  }
}
