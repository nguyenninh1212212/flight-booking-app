import { Router } from "express";
import userRouter from "./userRouter";
import roleRouter from "./roleRouter";
const router = Router();

router.use("/users", userRouter);
router.use("/roles", roleRouter);

export default router;
