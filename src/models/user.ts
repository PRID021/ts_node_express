import { sequelize } from "@settings/database";
import { DataTypes, Model, Optional } from "sequelize";
import bcrypt from "bcryptjs";

interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id" | "createdAt" | "updatedAt"> { }

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }

    toJSON() {
        const { password, ...userWithoutPassword } = this.get();
        return userWithoutPassword;
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
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
        modelName: "User", 
        tableName: "users", 
        timestamps: true,
    }
);

User.beforeCreate(async (user) => {
    user.password = await User.hashPassword(user.password);
});


export default User;
