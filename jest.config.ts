import { type Config } from "jest";

const config: Config = {
	moduleFileExtensions: ["js", "json", "ts"],
	rootDir: "src",
	testEnvironment: "node",
	testRegex: ".*\\.spec\\.ts$",
	transform: {
		"^.+\\.(t|j)s$": "@swc/jest",
	},
	collectCoverageFrom: ["**/*.(t|j)s"],
	coverageDirectory: "../coverage",
	moduleNameMapper: {
		"^src/(.*)$": "<rootDir>/$1",
	},
	setupFiles: ["reflect-metadata"],

	verbose: true,
	coverageProvider: "v8",
	coveragePathIgnorePatterns: ["/node_modules/", ".interface.ts", ".enum.ts"],
	clearMocks: true,
};

export default config;
