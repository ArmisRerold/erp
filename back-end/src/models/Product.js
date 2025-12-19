import sequelize from "../config/database.js";
import User from "./User.js";
import { Model, DataTypes, STRING } from "sequelize";
import Category from "./Category.js";
class Product extends Model{}

Product.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,

    },
    unMeasure: {
        type: DataTypes.STRING,
        defaultValue: "un",
        allowNull: false
    },
   description: {
    type: DataTypes.TEXT,
allowNull: true,
   },
   cost: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    allowNull: false
   },
   sell_value: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    allowNull: false,
    validate: {
        min: 0,
        isGreaterThanCost(value){
            if(parseFloat(value) < parseFloat(this.cost)){
                throw new Error("sell value should'n be smallest than cost")
            }
        }
    }
   },
   category: {
    type: DataTypes.INTEGER,
    references:{
        model: Category,
        key: "id"
    },
    allowNull: false
   },
   autor: {
    type: DataTypes.INTEGER,
    references:{
        model: User,
        key: "id"
    },
    allowNull: false
   },



}, {
    sequelize, 
    modelName: "Product",
    tableName: "Products"
})
export default Product