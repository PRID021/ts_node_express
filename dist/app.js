import express from 'express';
import { loggerMiddleware } from './middlewares/loggerMiddleware.js';
import { appConfigs } from "./settings/config.js";
import { sequelize } from './settings/database.js';
const app = express();
// Middleware to parse JSON body
app.use(express.json());
// Apply the logger middleware to all incoming requests
app.use(loggerMiddleware);
// Example route
app.get('/', (req, res) => {
    sequelize.authenticate()
        .then(() => {
        console.log('Database connection has been established successfully.');
    })
        .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
    res.send('Hello, world!');
});
// Another example route with query params and body
app.post('/test', (req, res) => {
    res.json({ message: 'Received POST request' });
});
// Start the server
app.listen(appConfigs.serverConfig.port, () => {
    console.log(`Server running on port ${appConfigs.serverConfig.port}`);
});
