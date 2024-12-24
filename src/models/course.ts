import { DataTypes, Model, Sequelize } from "sequelize";
import User from "./user";

export class Course extends Model {
  public id!: number;
  public teacherId!: number;
  public title!: string;
  public description!: string;
  public coverImgUrl!: string;
  public price!: number;
  public createAt!: Date;
  public updateAt!: Date;
}

export const createCourseTable = (sequelize: Sequelize) => {
  Course.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      teacherId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: User,
          key: "id",
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      coverImgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Course",
      tableName: "courses",
      timestamps: true,
    }
  );
};
