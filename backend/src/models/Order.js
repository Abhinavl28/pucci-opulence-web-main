import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

const Order = sequelize.define("Order", {
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
  total_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  shipping_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shipping_address1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shipping_address2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  shipping_city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shipping_state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shipping_pincode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shipping_phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  payment_method: {
    type: DataTypes.ENUM("card", "upi", "cash"),
    allowNull: false,
  },
}, {
  tableName: "orders",
  timestamps: true,
});

User.hasMany(Order, { foreignKey: "user_id", as: "orders" });
Order.belongsTo(User, { foreignKey: "user_id", as: "user" });

export default Order;

