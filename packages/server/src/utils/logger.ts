import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";
import { existsSync, mkdirSync } from "fs";
import { Request } from "express";

const env = process.env.NODE_ENV || "development";
const logDir = "log";
const envToLevel = () => {
  switch (env) {
    case "test":
      return "error";
    case "production":
      return "warn";
    default:
      return "info";
  }
};

// Create the log directory if it does not exist
if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: `${logDir}/%DATE%-results.log`,
  datePattern: "DD-MM-YYYY",
});

export const logger = createLogger({
  // change level if in dev environment versus production
  level: envToLevel(),
  format: format.combine(
    format.timestamp({
      format: "DD-MM-YYYY HH:mm:ss",
    }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: envToLevel(),
      format: format.combine(
        format.colorize(),
        format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
    }),
    dailyRotateFileTransport,
  ],
});

export const logError = (err: any, req?: Request) => {
  const tmpBody: any = req ? req.body : {};
  const userMsg =
    req && req.user
      ? `userID: ${req.user._id}\n  user email:${req.user.email}`
      : "";

  if (tmpBody.password) {
    delete tmpBody.password;
  }

  if (tmpBody.password2) {
    delete tmpBody.password2;
  }

  const bodyMsg = `body:${JSON.stringify(tmpBody)}`;
  const url = req ? req.url : "";

  logger.error(`
  url:${url}
  ${userMsg}
  ${bodyMsg}
  error:${err}
  `);
};
