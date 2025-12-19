import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";
class Category extends Model{}

Category.init({
    id: {type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    title: {type: DataTypes.STRING, allowNull: false}
}, {sequelize, 
    modelName: "Category",
    tableName: "Categories",
})

export default Category;