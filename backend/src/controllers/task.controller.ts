import { Request, Response } from "express";
import Task from "../models/Task";
import User from "../models/User";

// Create task
export const createTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.create({ ...req.body });
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all tasks with user information
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "email"],
        },
      ],
    });
    res.status(200).send(tasks);
  } catch (error) {
    console.log(error);

    res.status(400).send(error);
  }
};

// Get all tasks of a user with user information
export const getAllTasksOfUser = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const tasks = await Task.findAll({
      where: { pidPerson: user.id },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "email"],
        },
      ],
    });
    res.status(200).send(tasks);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get task by id with user information
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "email"],
        },
      ],
    });
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }

    await task.update(req.body);
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update task status
export const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }

    const status = req.body.status;
    if (status) {
      if (status === "In Progress") {
        task.inProgressAt = new Date();
      } else if (status === "Completed") {
        task.completedAt = new Date();
      } else if (status === "Pending") {
        task.inPendingAt === new Date();
      }
    }
    await task.update(req.body);
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }

    await task.destroy();
    res.send({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
};
