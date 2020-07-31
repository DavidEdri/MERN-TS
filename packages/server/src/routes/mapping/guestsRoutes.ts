import { Router } from "express";
import auth from "../api/guests/auth";

const router = Router();

router.use("/auth", auth);

export default router;
