import { Sequelize } from 'sequelize';

import { appConfigs } from "@settings/config"

export const sequelize = new Sequelize({
    dialect: 'mysql',
    host: appConfigs.databaseConfigs.host,
    username: appConfigs.databaseConfigs.username,
    password: appConfigs.databaseConfigs.password,
    database: appConfigs.databaseConfigs.database,
    logging: false,
});

