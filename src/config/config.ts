import dotenv from "dotenv";
import { object, string } from "zod";

import { join } from "node:path";

const nodeEnv = process.env.NODE_ENV;

dotenv.config({
	path: join(process.cwd(), "envs", `.env.${nodeEnv}`),
});

dotenv.config({
	path: join(process.cwd(), "envs", ".env"),
});

const CONFIG_API_SCHEMA = object({
	API_PORT: string().nonempty("API Port is required"),
});

const CONFIG_PRISMA_SCHEMA = object({
	DATABASE_URL: string().nonempty("Database Url is required"),
});

const CONFIG_LOGGER_SCHEMA = object({
	LOGGER_LEVEL: string().nonempty("Log Level is required"),
});

export const Config = {
	prisma: CONFIG_PRISMA_SCHEMA.parse({
		DATABASE_URL: process.env.DATABASE_URL,
	}),
	api: CONFIG_API_SCHEMA.parse({
		API_PORT: process.env.API_PORT,
	}),
	logger: CONFIG_LOGGER_SCHEMA.parse({
		LOGGER_LEVEL: process.env.LOGGER_LEVEL,
	}),
};
