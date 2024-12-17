import express from 'express';
import { logger } from '@utils/logger';

const app = express();
const port = process.env.PORT || 3000;



// Middleware to parse JSON body
app.use(express.json());

// Apply the logger middleware to all incoming requests
app.use(logger);

// Example route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Another example route with query params and body
app.post('/test', (req, res) => {
    res.json({ message: 'Received POST request' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
