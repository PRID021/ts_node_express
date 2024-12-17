import { Request, Response } from "express";
import { sequelize } from '@settings/database';

export const greeting = async (req: Request, res: Response): Promise<void> => {
    try {
        await sequelize.authenticate();
        res.send('Database connection has been established successfully.');
    } catch (err) {
        res.status(500).send('Unable to connect to the database.');
        console.error('Error connecting to the database:', err);
    }
};

export const testPost = async (req: Request, res: Response): Promise<void> => {
    try {
        res.json({
            message: 'Received POST request',
            receivedData: req.body,
        });
    } catch (err: any) {
        res.status(500).json({
            message: 'Error handling POST request',
            error: err.message,
        });
    }
};