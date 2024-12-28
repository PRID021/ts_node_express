import bcrypt from "bcryptjs";
import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface UserAttributes {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
  user_name: string;
  password: string;
  birth_of_day: Date;
  phone_number: string;
  created_at?: Date;
  deleted_at?: Date;

  is_verified: boolean;
  reset_password_token?: string | null;
  reset_password_expires_at?: Date | null;
  verification_token?: string | null;
  verification_token_expires_at?: Date | null;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "created_at" | "deleted_at"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public email!: string;
  public password!: string;
  public avatar!: string;
  public first_name!: string;
  public last_name!: string;
  public user_name!: string;
  public birth_of_day!: Date;
  public phone_number!: string;
  public is_verified!: boolean;

  public readonly created_at!: Date;
  public readonly deleted_at!: Date;

  public reset_password_token?: string | null;
  public reset_password_expires_at?: Date | null;
  public verification_token?: string | null;
  public verification_token_expires_at?: Date | null;

  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  toJSON() {
    const {
      password,
      reset_password_token,
      reset_password_expires_at,
      verification_token,
      verification_token_expires_at,
      ...userDataResponse
    } = this.get();
    return userDataResponse;
  }
}

export const createUserTable = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },

      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      birth_of_day: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      is_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      reset_password_token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      reset_password_expires_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      verification_token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      verification_token_expires_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
    }
  );

  User.beforeCreate(async (user) => {
    user.password = await User.hashPassword(user.password);
  });
};

export default User;
