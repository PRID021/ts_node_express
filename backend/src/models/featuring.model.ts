import { DataTypes, Model, Sequelize } from "sequelize";
import { Media } from "./media.model";

export class Featuring extends Model {
  public id!: number; // Primary key
  public desktop_id!: number; // Foreign key for desktop media
  public mobile_id!: number; // Foreign key for mobile media
  public imageAlt!: string; // Alt text for the image
  public heading!: string; // Heading text
  public text!: string; // Description text

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public toJSON() {
    const values = { ...this.get() };

    return {
      id: values.id,
      imageAlt: values.imageAlt,
      heading: values.heading,
      text: values.text,
      desktop_media: values.desktop_media?.source, // Only return source for desktop media
      mobile_media: values.mobile_media?.source, // Only return source for mobile media
    };
  }
}

export const initFeaturingModel = (sequelize: Sequelize) => {
  Featuring.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      desktop_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: Media, // Reference the Media model
          key: "id", // Foreign key points to Media.id
        },
        onDelete: "CASCADE", // Deletes Featuring entry if the referenced Media is deleted
        onUpdate: "CASCADE",
      },
      mobile_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: Media,
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      imageAlt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      heading: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "featurings",
      modelName: "Featuring",
      timestamps: true,
    }
  );
};
