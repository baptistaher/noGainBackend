import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import { router } from "./src/routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use("/api", router);

app.listen(process.env.PORT, () => {
	console.log(`server is running on port ${process.env.PORT}`);
});
