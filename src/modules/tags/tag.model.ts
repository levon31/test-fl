import {Column, HasMany, Model, Table} from 'sequelize-typescript';

@Table
export class Tag extends Model {
    @Column
    name: string;
    @Column
    id: primary
}