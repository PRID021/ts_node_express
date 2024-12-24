import express from "express";

import { authMiddleware } from "src/middlewares/authMiddleware";
import { loggerMiddleware } from "src/middlewares/loggerMiddleware";

import authRoutes from "@routers/authRoutes";
import landingRoutes from "@routers/landingRoutes";
import userRoutes from "@routers/userRoutes";
import { appConfigs } from "@settings/config";
import { syncDatabase } from "@settings/database";
import { appDir } from "@utils/pathUtils";
import path from "path";

const app = express();

app.use("/app/uploads", express.static(path.join(appDir, "uploads")));

// Create Tables
syncDatabase();

// Middleware
app.use(express.json());
app.use(loggerMiddleware);

//  ROUTE IMPORT
app.use("/", landingRoutes);
app.use("/auth", authRoutes);
app.use("/user", authMiddleware, userRoutes);

// Start the server
app.listen(appConfigs.serverConfig.port, () => {
  console.log(`Server running on port ${appConfigs.serverConfig.port}`);
});
