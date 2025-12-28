import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import Product from "./Product.js";
import User from "./User.js";
import Client from "./Client.js";

class ErrorInsufficientStock extends Error {
    constructor(message) {
        super(message)
        this.name = "Insufficient stock"
    }
}

class InventoryMovement extends Model {
    static TYPES = { ENTRADA: "Entrada", SAIDA: "Saída", TRANSFERENCIA: "Transferência" }
}

InventoryMovement.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    product: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: "id"
        },
        allowNull: false
    },
    client: {
        type: DataTypes.INTEGER,
        references: {
            model: Client,
            key: "id",
        },
        allowNull: true,

    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM(...Object.values(InventoryMovement.TYPES)),
        allowNull: false,
    },
    previous_amount: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    after_amount: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: true
    },
    autor: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id"
        }
    }




},
    {
        sequelize,
        modelName: "InventoryMoviment",
        tableName: "InventoryMoviments",

        hooks: {
            beforeCreate: async (moviment, options) => {
                const product = await Product.findByPk(moviment.product)

                if (!product) {
                    throw new Error("Product not found");
                }

                moviment.previous_amount = product.amount
                if (moviment.type === InventoryMovement.TYPES.ENTRADA) {
                    product.amount += moviment.amount
                } else if (moviment.type === InventoryMovement.TYPES.SAIDA || moviment.type === InventoryMovement.TYPES.TRANSFERENCIA) {
                    if (product.amount < moviment.amount) {
                        throw new ErrorInsufficientStock(`Insufficient stock. Available: ${product.amount}`)
                    }
                    product.amount -= moviment.amount
                }

                moviment.after_amount = product.amount
                await product.save({ transaction: options.transaction });


            },


        }
    },

)

export default InventoryMovement;