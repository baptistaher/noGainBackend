import { context, trace } from "@opentelemetry/api";
import pino from "pino";
import pinoHttp from "pino-http";

import { Config } from "../config/config";

const baseLogger = pino({
	level: Config.logger.LOGGER_LEVEL,
	mixin() {
		const span = trace.getSpan(context.active());

		if (!span) return {};

		const spanContext = span.spanContext();

		return {
			traceId: spanContext.traceId,
			spanId: spanContext.spanId,
		};
	},
});

const logger = pinoHttp({
	logger: baseLogger,
});

export default logger;
