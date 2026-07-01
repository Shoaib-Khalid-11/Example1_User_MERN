import express from "express";
import {
  deleteUserProfile,
  forgotPassword,
  getAllUsers,
  getUserProfile,
  login,
  logout,
  register,
  updatePassword,
  updateUserProfile,
} from "../controllers/user.controller.ts";
import { isProtected } from "../middlewares/index.ts";
const router = express.Router();
//? Get Requests
router.get("/logout", isProtected, logout);
router.get("/profile/:id", isProtected, getUserProfile);
router.get("/all", isProtected, getAllUsers);
//? Post Requests
router.post("/register", register);
router.post("/login", login);
router.post("/forgot/password", forgotPassword);
//? Put Requests
router.put("/update/profile/:id", isProtected, updateUserProfile);
router.put("/update/password/:id", isProtected, updatePassword);
//? Delete Requests
router.delete("/delete/profile/:id", isProtected, deleteUserProfile);

export default router;
