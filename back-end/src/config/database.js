import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "postgres://postgres:arms14@localhost:5432/mini_erp",
  {
    dialect: "postgres",
    logging: false,
  }
);

try {
  await sequelize.authenticate();
  console.log("Connected at bd");
} catch (e) {
  console.error("Unable to connect to database:", e);
}

export default sequelize;
