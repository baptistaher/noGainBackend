import { Router } from "express";

import {
	createEmployeeController,
	getAllEmployeeController,
	getEmployeeByIdController,
} from "../../controllers/Employee";

const employeeRoutes = Router();

employeeRoutes.post("/", createEmployeeController);
employeeRoutes.get("/", getAllEmployeeController);
employeeRoutes.get("/:id", getEmployeeByIdController);

export { employeeRoutes };
