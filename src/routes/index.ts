import { Router } from "express";

import { employeeRoutes } from "./Employee";

const router = Router();

router.use("/employee", employeeRoutes);

export { router };
