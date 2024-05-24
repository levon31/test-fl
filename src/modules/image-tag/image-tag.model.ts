import { Model, Column, DataType, Table } from 'sequelize-typescript';

@Table({ tableName: 'imageTags' })
export class ImageTag extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true })
  imageId: number;

  @Column({ type: DataType.INTEGER, primaryKey: true })
  tagId: number;
}