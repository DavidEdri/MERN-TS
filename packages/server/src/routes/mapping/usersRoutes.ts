import { Router } from "express";
import userActions from "../api/users/userActions";

const router = Router();

router.use("/userActions", userActions);

export default router;
