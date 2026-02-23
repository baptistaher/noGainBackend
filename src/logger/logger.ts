import pino from "pino";
import pinoHttp from "pino-http";
import { Config } from "../config/config";

const baseLogger = pino({
	level: Config.logger.LOGGER_LEVEL,
});

const logger = pinoHttp({
	logger: baseLogger,
});

export default logger;
