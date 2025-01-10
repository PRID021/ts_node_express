import { DataTypes, Model, Sequelize } from "sequelize";
import { Media } from "./media.model";

export class LearningStyle extends Model {
  public id!: number;
  public icon_media_id!: number;
  public title!: string;
  public description!: string;
  public illus_media_id!: number;

  public toJSON() {
    const values = { ...this.get() };
    return {
      icon: values.icon_media?.source,
      title: values.title,
      description: values.description,
      illus: values.illus_media?.source,
    };
  }
}

export const initLearningStyleModel = (sequelize: Sequelize) => {
  LearningStyle.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      icon_media_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: Media,
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      illus_media_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: Media,
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      sequelize,
      tableName: "learning_styles",
      modelName: "LearningStyle",
      timestamps: true,
    }
  );
};
