import { Request, Response, NextFunction } from "express";
import chalk from "chalk";

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();
  const timestamp = new Date().toISOString();
  const endPoint = `${req.method} ${chalk.green(req.originalUrl)}`;
  const reqHeaderInfo = `${chalk.yellow("Headers: ")} ${chalk.white(
    JSON.stringify(req.headers, null, 2)
  )}`;

  let message = `[${timestamp}] \n ${endPoint} \n ${reqHeaderInfo}`;
  if (Object.keys(req.query).length > 0) {
    const queryParams = `${chalk.magenta("Query Params: ")} ${chalk.white(
      JSON.stringify(req.query, null, 2)
    )}`;
    message = `${message} \n ${queryParams}`;
  }
  if (["POST", "PUT", "PATCH"].includes(req.method) && req.body) {
    const body = `${chalk.cyan("Body: ")} ${chalk.white(
      JSON.stringify(req.body, null, 2)
    )}`;
    message = `${message} \n${body}`;
  }
  res.on("finish", () => {
    const duration = Date.now() - start;
    const statusMessage =
      `${chalk.blue(`${req.method} ${chalk.green(req.originalUrl)} `)} ` +
      chalk.yellow(`Status: ${res.statusCode} Duration: ${duration}ms`);
    message = `${message} \n ${statusMessage} \n ----------------------------------------`;
    console.log(message);
    // logger.info(`${message}`)
  });
  next();
};
