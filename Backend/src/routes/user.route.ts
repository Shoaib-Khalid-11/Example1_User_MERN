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
import { isAuthenticated } from "../middlewares/auth.ts";
const router = express.Router();
//? Get Requests
router.get("/logout", isAuthenticated, logout);
router.get("/profile/:id", isAuthenticated, getUserProfile);
router.get("/all", isAuthenticated, getAllUsers);
//? Post Requests
router.post("/register", register);
router.post("/login", login);
router.post("/forgot/password", forgotPassword);
//? Put Requests
router.put("/update/profile/:id", isAuthenticated, updateUserProfile);
router.put("/update/password/:id", isAuthenticated, updatePassword);
//? Delete Requests
router.delete("/delete/profile/:id", isAuthenticated, deleteUserProfile);

export default router;
