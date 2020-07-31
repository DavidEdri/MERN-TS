import express from "express";
import controller from "../../../controllers/admins/usersManagement";

const router = express.Router();

router.get("/", controller.get);

router.post("/", controller.post);

router.delete("/:id", controller.del);

router.put("/:id", controller.put);

router.post("/changePass/:id", controller.changePass);

export default router;
