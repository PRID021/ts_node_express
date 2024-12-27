import { DataTypes, Model, Sequelize } from "sequelize";
import User from "./user.model";

export default class RefreshToken extends Model {
  public id!: number;
  public user_id!: number;
  public refresh_token!: string;
  public expires_at!: Date;
  public created_at!: Date;
  public updated_at!: Date;
}

export const createRefreshTokenTable = (sequelize: Sequelize) => {
  RefreshToken.init(
    {
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: User,
          key: "id",
        },
      },
      refresh_token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "RefreshToken",
      tableName: "refresh_tokens",
      timestamps: true,
      underscored: true,
    }
  );
};
