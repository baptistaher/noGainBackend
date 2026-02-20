import { defineConfig } from "prisma/config";
import { Config } from "./src/config/config";

export default defineConfig({
	schema: "prisma/schema.prisma",
	migrations: {
		path: "prisma/migrations",
	},
	datasource: {
		url: Config.prisma.DATABASE_URL,
	},
});
