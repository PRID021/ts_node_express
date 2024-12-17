import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';

export const logger = (req: Request, res: Response, next: NextFunction) => {


    const start = Date.now();
    console.log(chalk.blue(`[${new Date().toISOString()}] ${req.method} ${chalk.green(req.originalUrl)}`));

    console.log(chalk.yellow('Headers: '), chalk.white(JSON.stringify(req.headers, null, 2)));

    if (Object.keys(req.query).length > 0) {
        console.log(chalk.magenta('Query Params: '), chalk.white(JSON.stringify(req.query, null, 2)));
    }

    if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body) {
        console.log(chalk.cyan('Body: '), chalk.white(JSON.stringify(req.body, null, 2)));
    }

    res.on('finish', () => {
        const duration = Date.now() - start; console.log(
            chalk.blue(`[${new Date().toISOString()}] ${req.method} ${chalk.green(req.originalUrl)} `) +
            chalk.yellow(`Status: ${res.statusCode} Duration: ${duration}ms`)
        );
    });

    next();
};
