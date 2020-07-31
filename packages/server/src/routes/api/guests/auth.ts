import express from "express";
import controller from "../../../controllers/guests/auth";

const router = express.Router();

router.post("/register", controller.register);

router.post("/activate/:token", controller.activate);

router.post("/login", controller.login);

router.post("/passwordReset", controller.passwordReset);

router.post("/validateResetToken", controller.validateResetToken);

router.post("/passwordReset/:token", controller.passwordResetWithToken);

router.post("/resendActivateMail/:id", controller.resendActivateMail);

export default router;
