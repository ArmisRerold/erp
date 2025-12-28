import sequelize from "../config/database.js";
import Client from "./Client.js";
import Adress from "./Adress.js";
import Product from "./Product.js";
import Category from "./Category.js";
async function sync() {
  try {
    await sequelize.authenticate();
    console.log("Conectado ao banco");
    await Adress.sync({alter: true})

    await Client.sync({ alter: true });

    await Category.sync({alter: true})

    await Product.sync({alter: true})
    

    console.log("Tabelas sincronizadas");
  } catch (error) {
    console.error("Erro ao sincronizar:", error);
  }
}
export default sync()
