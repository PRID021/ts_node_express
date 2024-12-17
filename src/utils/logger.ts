import winston from 'winston';
import 'winston-daily-rotate-file';


const logTransport = new winston.transports.DailyRotateFile({
  filename: 'log.txt',
  maxSize: '10m',  // 10MB limit
  maxFiles: '1',   // Keep only one file
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  ),
});

export const logger = winston.createLogger({
  level: 'info',
  transports: [
    logTransport,
  ],
});
