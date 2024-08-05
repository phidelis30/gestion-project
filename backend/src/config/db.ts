import { Dialect, Sequelize } from "sequelize";

const database = process.env.DB_DATABASE || "db-project";
const user = process.env.DB_USER || "root";
const password = process.env.DB_PWD || "";
const host = process.env.DB_HOST || "localhost";
const port = process.env.DB_PORT || 3306;
const dialect = process.env.DB_DIALECT || "mysql";

const sequelize = new Sequelize(database, user, password, {
  host: host,
  port: port as number,
  dialect: dialect as Dialect,
});

// connection to db
const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { sequelize, dbConnection };
