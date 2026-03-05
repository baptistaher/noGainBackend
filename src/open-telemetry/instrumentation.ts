import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { ConsoleMetricExporter, PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { ConsoleSpanExporter } from "@opentelemetry/sdk-trace-node";
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from "@opentelemetry/semantic-conventions";

const sdk = new NodeSDK({
	resource: resourceFromAttributes({
		[ATTR_SERVICE_NAME]: "api-service",
		[ATTR_SERVICE_VERSION]: "1.0.0",
	}),
	traceExporter: new OTLPTraceExporter({
		url: "http://localhost:4318/v1/traces",
	}),
	// traceExporter: new ConsoleSpanExporter(),
	// metricReader: new PeriodicExportingMetricReader({
	// 	exporter: new ConsoleMetricExporter(),
	// }),
	instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
