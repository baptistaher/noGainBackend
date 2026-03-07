import { type Meter } from "@opentelemetry/api";
import { type Counter, type Histogram } from "@opentelemetry/api-metrics";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http";
import { MeterProvider, PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";

const metricExporter = new OTLPMetricExporter({
	url: "http://otel-collector:4318/v1/metrics",
});

const metricReader = new PeriodicExportingMetricReader({
	exporter: metricExporter,
	exportIntervalMillis: 1000,
});

const metricProvider = new MeterProvider({
	readers: [metricReader],
});

const meter: Meter = metricProvider.getMeter("nogain-api-metrics", "1.0");
const requestCounter: Counter = meter.createCounter("http_requests_total", {
	description: "Total number of HTTP requests",
});

// Histogram for request duration in milliseconds
const requestDuration: Histogram = meter.createHistogram("http_request_duration_ms", {
	description: "Duration of HTTP requests in milliseconds",
});

export { meter, requestCounter, requestDuration };

// Counter for number of requests
