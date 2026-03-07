import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from "@opentelemetry/semantic-conventions";

const traceExporter = new OTLPTraceExporter({
	url: "http://otel-collector:4318/v1/traces",
});

const metricExporter = new OTLPMetricExporter({
	url: "http://otel-collector:4318/v1/metrics",
});

const sdk = new NodeSDK({
	resource: resourceFromAttributes({
		[ATTR_SERVICE_NAME]: "api-service",
		[ATTR_SERVICE_VERSION]: "1.0.0",
	}),
	traceExporter: traceExporter,
	metricReader: new PeriodicExportingMetricReader({
		exporter: metricExporter,
		exportIntervalMillis: 1000,
	}),

	instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
