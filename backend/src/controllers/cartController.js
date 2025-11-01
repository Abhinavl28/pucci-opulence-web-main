import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.findAll({
      where: { user_id: req.user.id },
      include: [
        {
          model: Product,
          as: "product",
          attributes: ["id", "name", "price", "images", "category"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const items = cartItems.map((item) => ({
      id: item.id,
      product: item.product,
      size: item.size,
      quantity: item.quantity,
    }));

    const total = cartItems.reduce((sum, item) => {
      return sum + parseFloat(item.product.price) * item.quantity;
    }, 0);

    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    res.json({
      items,
      total: parseFloat(total.toFixed(2)),
      itemCount,
    });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { product_id, size, quantity = 1 } = req.body;

    if (!product_id || !size) {
      return res.status(400).json({ message: "Product ID and size are required" });
    }

    // Check if product exists
    const product = await Product.findByPk(product_id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if item already exists in cart
    const existingCartItem = await Cart.findOne({
      where: {
        user_id: req.user.id,
        product_id,
        size,
      },
    });

    if (existingCartItem) {
      // Update quantity
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      return res.json({
        message: "Cart updated",
        item: existingCartItem,
      });
    }

    // Create new cart item
    const cartItem = await Cart.create({
      user_id: req.user.id,
      product_id,
      size,
      quantity,
    });

    const cartItemWithProduct = await Cart.findByPk(cartItem.id, {
      include: [
        {
          model: Product,
          as: "product",
          attributes: ["id", "name", "price", "images", "category"],
        },
      ],
    });

    res.status(201).json({
      message: "Item added to cart",
      item: {
        id: cartItemWithProduct.id,
        product: cartItemWithProduct.product,
        size: cartItemWithProduct.size,
        quantity: cartItemWithProduct.quantity,
      },
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const cartItem = await Cart.findOne({
      where: {
        id,
        user_id: req.user.id,
      },
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    const cartItemWithProduct = await Cart.findByPk(cartItem.id, {
      include: [
        {
          model: Product,
          as: "product",
          attributes: ["id", "name", "price", "images", "category"],
        },
      ],
    });

    res.json({
      message: "Cart item updated",
      item: {
        id: cartItemWithProduct.id,
        product: cartItemWithProduct.product,
        size: cartItemWithProduct.size,
        quantity: cartItemWithProduct.quantity,
      },
    });
  } catch (error) {
    console.error("Update cart error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    const cartItem = await Cart.findOne({
      where: {
        id,
        user_id: req.user.id,
      },
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    await cartItem.destroy();

    res.json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    await Cart.destroy({
      where: { user_id: req.user.id },
    });

    res.json({ message: "Cart cleared" });
  } catch (error) {
    console.error("Clear cart error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

