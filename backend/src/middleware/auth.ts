import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).send({ error: "Authentication required." });
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret_key"
    ) as { id: number };
    const user = await User.findByPk(decoded.id);
    if (!user) {
      throw new Error();
    }
    (req as any).user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

const authorizeOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as any).user;
  if (!user) {
    return res.status(401).send({ error: "Please authenticate." });
  }

  if (user.role !== "admin") {
    return res.status(403).send({ error: "Access denied." });
  }

  next();
};

export { authenticate, authorizeOwner };
