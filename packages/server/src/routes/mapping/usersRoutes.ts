import { Router } from "express";
import userActions from "../api/users/userActions";

const router = Router();

router.use("/profile", userActions);

export default router;
