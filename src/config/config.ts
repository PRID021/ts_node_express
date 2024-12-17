import { AppConfigs } from '@config/appConfigs';
import dotenv from 'dotenv';

dotenv.config();

const environment = process.env.ENVIRONMENT || "development";
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 8000;
const dbName = process.env.DB_NAME || "course_management_db";
const dbPassword = process.env.DB_PASSWORD || "Password123@@"
const jwtSecret = process.env.JWT_SECRET || 'e3fd00e611b6ca2d72a56b1b04e3c861797992d37b3c2783bc4e33b42c4e3c19';


const appConfigs: AppConfigs = {
    databaseConfigs: {
        host: dbHost,
        port: dbPort,
        name: dbName,
        password: dbPassword,
    },
    environment: environment,
};
