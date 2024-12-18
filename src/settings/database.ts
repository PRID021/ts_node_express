import { Sequelize } from 'sequelize';
import User from "@models/user";
import { appConfigs } from "@settings/config"




export const sequelize = new Sequelize({
    dialect: 'mysql',
    host: appConfigs.databaseConfigs.host,
    username: appConfigs.databaseConfigs.username,
    password: appConfigs.databaseConfigs.password,
    database: appConfigs.databaseConfigs.database,
    logging: false,
});


export const syncDatabase = async () => {
    try {
        // if (process.env.DB_SYNC === "true") {
        //     await sequelize.sync({ force: true }); // Dangerous: only use for development/testing
        //     console.log("Database synchronized with force.");
        // } else {
        //     await sequelize.sync();
        //     console.log("Database synchronized.");
        // }
        await sequelize.sync();
        console.log("Database synchronized.  ");
    } catch (error) {
        console.error("Failed to synchronize the database:", error);
    }
};

