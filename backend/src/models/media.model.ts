import { DataTypes, Model, Sequelize } from "sequelize";

type ContentType = "image" | "video";

export class Media extends Model {
  public id!: number;

  public description!: string;
  public source!: string;
  public thumb!: string;
  public title!: string;
  public contentType!: ContentType;
}

export const createMediaTable = (sequelize: Sequelize) => {
  Media.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },

      description: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      source: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      thumb: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contentType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize, modelName: "Media", tableName: "medias", timestamps: true }
  );
};
