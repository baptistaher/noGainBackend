import bodyParser from "body-parser";
import express from "express";

import { Config } from "./src/config/config";
import logger from "./src/logger/logger";
import { router } from "./src/routes";

const app = express();

app.use(logger);

app.use(express.json());
app.use(bodyParser.json());

app.use("/api", router);

app.listen(Config.api.API_PORT, () => {
	console.log(`server is running on port ${Config.api.API_PORT}`);
});
