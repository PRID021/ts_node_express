import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import { authMiddleware } from "@middlewares/auth_middleware";
import { loggerMiddleware } from "@middlewares/logger_middleware";

import authRoutes from "@routers/auth.routes";
import landingRoutes from "@routers/landing.routes";
import userRoutes from "@routers/user.routes";
import { appConfigs } from "@settings/config";
import { syncDatabase } from "@settings/database";
import { appDir } from "@utils/pathUtils";
import path from "path";

const app = express();

app.use(
  cors({
    origin: /.*/,
    credentials: true, // Allow cookies to be sent
  })
);
app.use(cookieParser());

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
