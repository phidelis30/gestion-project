import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";

// create user
export const createUser = async (req: Request, res: Response) => {
  try {
    // crypt password
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    const user = await User.create({ ...req.body, password: hashedPassword });
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

// get all user
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
};

// get user by admin
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Extract password if provided
    const { password, ...updateData } = req.body;

    // Hash password if it's provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 8);
      updateData.password = hashedPassword;
    }

    // Update user data
    await user.update(updateData);
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

// delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // delete user
    await user.destroy();
    res.send({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
};
