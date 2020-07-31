import express from "express";
import controller from "../../../controllers/users/userActions";

const router = express.Router();

router.get("/refreshjwt", controller.refreshJWT);

router.post("/editInfo", controller.editInfo);

export default router;
