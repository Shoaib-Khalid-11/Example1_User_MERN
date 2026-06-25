import express from "express";
import {
  ResetPasswordEmail,
  verifyEmail,
} from "../controllers/verification.controller.ts";
const router = express.Router();
router.get("/verify-email/:token", verifyEmail);

router.put("/reset/password/:resetPasswordTokenParam", ResetPasswordEmail);
export default router;
