import { sequelize } from "@settings/database";
import { DataTypes, Model, Sequelize } from "sequelize";

export class Post extends Model {
  public id!: number;
  public authorId!: number;
  public title!: String;
  public content!: String;
  public shortDescription!: String;
  public imgUrl!: String;
}

export const createPostTable = (sequelize: Sequelize) => {
  Post.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },

      authorId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shortDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize, modelName: "Post", tableName: "post", timestamps: true }
  );
};
