import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
  try {
    const {
      shipping_name,
      shipping_address1,
      shipping_address2,
      shipping_city,
      shipping_state,
      shipping_pincode,
      shipping_phone,
      payment_method,
    } = req.body;

    if (
      !shipping_name ||
      !shipping_address1 ||
      !shipping_city ||
      !shipping_state ||
      !shipping_pincode ||
      !shipping_phone ||
      !payment_method
    ) {
      return res.status(400).json({ message: "Missing required shipping information" });
    }

    if (!["card", "upi", "cash"].includes(payment_method)) {
      return res.status(400).json({ message: "Invalid payment method" });
    }

    // Get cart items
    const cartItems = await Cart.findAll({
      where: { user_id: req.user.id },
      include: [
        {
          model: Product,
          as: "product",
        },
      ],
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total
    const total_price = cartItems.reduce((sum, item) => {
      return sum + parseFloat(item.product.price) * item.quantity;
    }, 0);

    // Create order
    const order = await Order.create({
      user_id: req.user.id,
      total_price: parseFloat(total_price.toFixed(2)),
      shipping_name,
      shipping_address1,
      shipping_address2: shipping_address2 || null,
      shipping_city,
      shipping_state,
      shipping_pincode,
      shipping_phone,
      payment_method,
    });

    // Create order items
    const orderItems = await Promise.all(
      cartItems.map((cartItem) =>
        OrderItem.create({
          order_id: order.id,
          product_id: cartItem.product_id,
          quantity: cartItem.quantity,
          size: cartItem.size,
          price: parseFloat(cartItem.product.price),
        })
      )
    );

    // Clear cart
    await Cart.destroy({
      where: { user_id: req.user.id },
    });

    // Get order with items and products
    const orderWithDetails = await Order.findByPk(order.id, {
      include: [
        {
          model: OrderItem,
          as: "items",
          include: [
            {
              model: Product,
              as: "product",
              attributes: ["id", "name", "price", "images", "category"],
            },
          ],
        },
      ],
    });

    res.status(201).json({
      message: "Order created successfully",
      order: orderWithDetails,
    });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { user_id: req.user.id },
      include: [
        {
          model: OrderItem,
          as: "items",
          include: [
            {
              model: Product,
              as: "product",
              attributes: ["id", "name", "price", "images", "category"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json({ orders });
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({
      where: {
        id,
        user_id: req.user.id,
      },
      include: [
        {
          model: OrderItem,
          as: "items",
          include: [
            {
              model: Product,
              as: "product",
              attributes: ["id", "name", "price", "images", "category"],
            },
          ],
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ order });
  } catch (error) {
    console.error("Get order error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

