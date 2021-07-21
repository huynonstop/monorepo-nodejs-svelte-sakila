import { Sequelize } from "sequelize";
import CONFIG from "../config.js";

const { DATABASE, USER, PASSWORD, HOST, DIALECT } = CONFIG;

const sequelize = new Sequelize({
  host: HOST,
  dialect: DIALECT,
  database: DATABASE,
  username: USER,
  password: PASSWORD,
});

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export default sequelize;
