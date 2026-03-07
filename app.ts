import "./src/open-telemetry/instrumentation";
import {  trace } from "@opentelemetry/api";
import bodyParser from "body-parser";
import express from "express";
import {  requestCounter, requestDuration } from "./src/open-telemetry/metrics";
import { Config } from "./src/config/config";
import logger from "./src/logger/logger";
import { router } from "./src/routes";

const tracer = trace.getTracer("nogain-api", "1.0");

const app = express();

app.use(logger);

app.use(express.json());
app.use(bodyParser.json());

// --- Middleware to track metrics ---
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    requestCounter.add(1, { route: req.path, method: req.method, status: res.statusCode });
    requestDuration.record(duration, { route: req.path, method: req.method, status: res.statusCode });
  });
  next();
});

// const expressInstrumentation = new ExpressInstrumentation({
// 	// ignoreLayersType: ["middleware"]
// })

// expressInstrumentation.setTracerProvider(trace);

app.use("/api", router);

app.listen(Config.api.API_PORT, () => {
	const span = tracer.startSpan("server.start");
	logger.logger.info(`server is runnig on port ${Config.api.API_PORT}`);

	span.end();
});
