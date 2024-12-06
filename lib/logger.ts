/* {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
} */

import winston from 'winston';
import colors from 'colors/safe';

function createLogger(moduleName:string = 'handbook') {
  const logger = winston.createLogger();

  logger.add(new winston.transports.Console({
    level: process.env.LOG_LEVEL || process.env.NEXT_PUBLIC_LOG_LEVEL || 'info',
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss ZZ',
      }),
      winston.format.colorize(),
      winston.format.ms(),
      winston.format.printf((info) =>
        `${info.timestamp} ${moduleName && colors.yellow(`[${moduleName}]`)} ${info.level}: ${info.message} ${info.ms}`
      )
    ),
  }));
  
  return logger;
}

export default createLogger;