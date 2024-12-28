import { DataTypes, Model, Sequelize } from "sequelize";
import User from "./user.model";

export class UserAddress extends Model {
  public id!: number;
  public userId!: number;
  public title!: string;
  public addressLine1!: string;
  public addressLine2!: string;
  public country!: string;
  public postCode!: string;
  public phoneNumber!: string;
  public createAt!: Date;
  public deletedAt?: Date;
}

export const createUserAddressTable = (sequelize: Sequelize) => {
  UserAddress.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
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
      addressLine1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      addressLine2: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "UserAddress",
      tableName: "user_address",
      timestamps: true,
    }
  );
};
