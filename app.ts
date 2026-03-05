import "./src/open-telemetry/instrumentation";
import { trace } from "@opentelemetry/api";
import bodyParser from "body-parser";
import express from "express";

import { Config } from "./src/config/config";
import logger from "./src/logger/logger";
import { router } from "./src/routes";

const tracer = trace.getTracer("nogain-api", "1.0");

const app = express();

app.use(logger);

app.use(express.json());
app.use(bodyParser.json());

app.use("/api", router);

app.listen(Config.api.API_PORT, () => {
	const span = tracer.startSpan("starting-project");
	logger.logger.info(`server is runnig on port ${Config.api.API_PORT}`);

	span.end();
});
