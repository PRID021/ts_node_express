import dotenv from 'dotenv';
dotenv.config();
const environment = process.env.ENVIRONMENT || "development";
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 8000;
const dbName = process.env.DB_NAME || "course_management_db";
const dbPassword = process.env.DB_PASSWORD || "Password123@@";
const jwtSecret = process.env.JWT_SECRET || 'your_secret_key';
const appConfigs = {
    databaseConfigs: {
        host: dbHost,
        port: dbPort,
        name: dbName,
        password: dbPassword,
    },
    environment: environment,
};
