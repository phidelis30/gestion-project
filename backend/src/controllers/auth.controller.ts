import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

// login
export const login = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).send({ error: "Invalid login credentials." });
    }
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "secret_key"
    );
    const userLogin = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };
    res.send({ userLogin, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    // Assume that authenticateUser middleware has attached user information to req.user
    const user = (req as any).user as User;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the user's data
    res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
