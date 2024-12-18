import express from 'express';

import { loggerMiddleware } from '@middlewares/loggerMiddleware';
import { authMiddleware } from '@middlewares/authMiddleware';

import { appConfigs } from "@settings/config";
import landingRoutes from '@routers/landingRoutes';
import authRoutes from "@routers/authRoutes";
import userRoutes from "@routers/userRoutes";
import { syncDatabase } from '@settings/database';

const app = express();

// Create Tables 
syncDatabase();
// Middleware 
app.use(express.json());
app.use(loggerMiddleware);

//  ROUTE IMPORT
app.use("/", landingRoutes);
app.use("/auth", authRoutes);
app.use("/user", authMiddleware, userRoutes)


// Start the server
app.listen(appConfigs.serverConfig.port, () => {
    console.log(`Server running on port ${appConfigs.serverConfig.port}`);
});
