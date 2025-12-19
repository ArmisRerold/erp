import { Sequelize } from "sequelize";



const sequelize = new Sequelize(
  String(process.env.DATABASE_URL),
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
