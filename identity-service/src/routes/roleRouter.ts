import roleController from "../controllers/roleController";
import express from "express";
import { authentication, authorization } from "../middleware/authMiddleware";
const router = express.Router();

router.post(
  "/create",
  authentication,
  authorization("ADMIN"),
  roleController.addRole,
);
router.get(
  "/all",
  authentication,
  authorization("ADMIN"),
  roleController.getAllRoles,
);
router.get(
  "/:id",
  authentication,
  authorization("ADMIN"),
  roleController.updateRole,
);

export default router;
