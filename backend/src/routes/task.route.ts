import express from "express";
import {
  createTask,
  getAllTasks,
  getAllTasksOfUser,
  updateTask,
  deleteTask,
  updateTaskStatus,
  getTaskById,
} from "../controllers/task.controller";
import { authenticate, authorizeOwner } from "../middleware/auth";

const router = express.Router();

router.post("/task/create", authenticate, authorizeOwner, createTask);
router.get("/task/all", authenticate, authorizeOwner, getAllTasks);
router.get("/task/user", authenticate, getAllTasksOfUser);
router.get("/task/id/:id", authenticate, getTaskById);
router.put("/task/update/:id", authenticate, authorizeOwner, updateTask);
router.put("/task/update-status/:id", authenticate, updateTaskStatus);
router.delete("/task/delete/:id", authenticate, deleteTask);

export default router;
