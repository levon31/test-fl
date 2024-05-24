import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Tag } from '../tag.model';

@Table
export class Image extends Model {
  @Column
  publishedDate: Date;

  @Column
  imageUrl: string;

  @HasMany(() => Tag)
  tags: Tag[];
}
