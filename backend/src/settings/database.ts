import { createTables } from "@models/index";
import { appConfigs } from "@settings/config";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "mysql",
  host: appConfigs.databaseConfigs.host,
  username: appConfigs.databaseConfigs.username,
  password: appConfigs.databaseConfigs.password,
  database: appConfigs.databaseConfigs.database,
  logging: true,
});

export const syncDatabase = async () => {
  await sequelize.authenticate();
  try {
    createTables(sequelize);
    if (process.env.DB_SYNC === "true") {
      await sequelize.sync({ force: true }); // Dangerous: only use for development/testing
      console.log("Database synchronized with force.");
    } else {
      await sequelize.sync();
      console.log("Database synchronized.");
    }
    console.log("All models synchronized!");
  } catch (error) {
    console.error("Failed to synchronize the database:", error);
  }
};
