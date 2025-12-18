import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";
import Adress from "./Adress.js";

class Client extends Model {}

Client.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    autor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    telefone: {
      type: DataTypes.TEXT,
    },
    cpf: {
      type: DataTypes.STRING,
    },
    endereco: {
      type: DataTypes.INTEGER,
      references: {
        model: Adress,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Client",
    tableName: "Clients",
  }
);

export default Client;
