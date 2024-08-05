import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import User from "./User";

interface TaskAttributes {
  id: number;
  name: string;
  description: string;
  status: string;
  pidPerson: number;
  createdAt?: Date;
  inProgressAt?: Date;
  inPendingAt?: Date;
  completedAt?: Date;
}

class Task extends Model<TaskAttributes> implements TaskAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public status!: string;
  public pidPerson!: number;
  public createdAt!: Date;
  public inProgressAt!: Date;
  public inPendingAt!: Date;
  public completedAt!: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pidPerson: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    inProgressAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    inPendingAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Task",
    tableName: "tasks",
    timestamps: true,
  }
);

// Define association
Task.belongsTo(User, { foreignKey: "pidPerson" });

export default Task;
