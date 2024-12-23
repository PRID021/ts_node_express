import express from "express";

import { authMiddleware } from "src/middlewares/authMiddleware";
import { loggerMiddleware } from "src/middlewares/loggerMiddleware";

import authRoutes from "@routers/authRoutes";
import landingRoutes from "@routers/landingRoutes";
import userRoutes from "@routers/userRoutes";
import { appConfigs } from "@settings/config";
import { syncDatabase } from "@settings/database";
import path from "path";

import { fileURLToPath as fileURLToPath2 } from "url";

const __filename = fileURLToPath2(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use("/app/uploads", express.static(path.join(__dirname, "../uploads")));

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
function fileURLToPath(url: string) {
  throw new Error("Function not implemented.");
}
