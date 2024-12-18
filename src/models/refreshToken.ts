import { DataTypes, Model } from 'sequelize';
import User from '@models/user';
import { sequelize } from '@settings/database';


export class RefreshToken extends Model {
    public id!: number;
    public user_id!: number;
    public refresh_token!: string;
    public expires_at!: Date;
    public created_at!: Date;
    public updated_at!: Date;

}

// Define the RefreshToken model
RefreshToken.init(
    {
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: User,  
                key: 'id',
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
        modelName: 'RefreshToken',
        tableName: 'refresh_tokens',  
        timestamps: true,
        underscored: true, 
    }
);