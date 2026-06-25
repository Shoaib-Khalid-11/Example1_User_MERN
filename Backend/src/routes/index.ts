import express from "express";
import userRouters from "./user.route.ts";
import VerificationRouters from "./verification.route.ts";
const router = express.Router();
router.use("/users", userRouters);
router.use("/verifications", VerificationRouters);
export default router;
