import { Router } from "express";
import usersManagement from "../api/admins/usersManagement";

const router = Router();

router.use("/usersManagement", usersManagement);

export default router;
