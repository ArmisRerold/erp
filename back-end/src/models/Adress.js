import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Adress extends Model {}
Adress.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rua: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numero: { type: DataTypes.STRING, defaultValue: "sn" },
    bairro: { type: DataTypes.STRING, allowNull: false },
    cidade: { type: DataTypes.STRING, allowNull: false },
    
    cep: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Adress",
    tableName: "Adress",
  }
);
export default Adress;
