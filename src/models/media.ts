import { Model } from "sequelize";

type ContentType = "image" | "video";

export class Media extends Model {
  public id!: number;
  public postId!: number;
  public description!: string;
  public source!: string;
  public thumb!: string;
  public title!: string;
  public contentType!: ContentType;
}
