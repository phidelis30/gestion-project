import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sequelize } from "./config/db";
import userRoutes from "./routes/user.route";
import taskRoutes from "./routes/task.route";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", taskRoutes);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

start();
