import express from 'express';
import { loggerMiddleware } from '@middlewares/loggerMiddleware';

import { appConfigs } from "@settings/config";
import landingRoutes from '@routers/landingRoutes';

const app = express();




// Middleware 
app.use(express.json());
app.use(loggerMiddleware);

//  ROUTE IMPORT
app.use("/", landingRoutes);


// Start the server
app.listen(appConfigs.serverConfig.port, () => {
    console.log(`Server running on port ${appConfigs.serverConfig.port}`);
});
