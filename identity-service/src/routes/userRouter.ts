import userController from "../controllers/userController";
import express from "express";
import { authentication, authorization } from "../middleware/authMiddleware";
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.put("/change-password", userController.changePassword);
router.get(
  "/all",
  authentication,
  authorization("ADMIN", "STAFF", "USER"),
  userController.getAllUsers,
);
router.get(
  "/:id",
  authentication,
  authorization("ADMIN", "STAFF"),
  userController.getUserById,
);
router.post("/refresh-token", userController.refreshToken);

export default router;
