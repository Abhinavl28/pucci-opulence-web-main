import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";
import Product from "./Product.js";

const Cart = sequelize.define("Cart", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: "id",
    },
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
}, {
  tableName: "carts",
  timestamps: true,
});

User.hasMany(Cart, { foreignKey: "user_id", as: "cartItems" });
Cart.belongsTo(User, { foreignKey: "user_id", as: "user" });

Product.hasMany(Cart, { foreignKey: "product_id", as: "cartItems" });
Cart.belongsTo(Product, { foreignKey: "product_id", as: "product" });

export default Cart;

