import express from "express";
import { login, getMe } from "../controllers/auth.controller";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controller";
import { authenticate, authorizeOwner } from "../middleware/auth";

const router = express.Router();

router.post("/auth/login", login);

router.post("/user/create", authenticate, authorizeOwner, createUser);
router.get("/user/me", authenticate, getMe);
router.get("/user/all", authenticate, authorizeOwner, getAllUsers);
router.get("/user/id:/id", authenticate, getUserById);
router.put("/user/update:/id", authenticate, authorizeOwner, updateUser);
router.delete("/user/delete:/id", authenticate, authorizeOwner, deleteUser);

export default router;
