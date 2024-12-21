import { Model } from "sequelize";


export class Post extends Model {
  public id!: number;
  public authorId!: number;
  public title!: string;
  public content!: string;
  public shortDescription!: string;
  public imgUrl!: string;
}
