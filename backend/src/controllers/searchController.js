import { Op } from "sequelize";
import Product from "../models/Product.js";

export const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }

    const searchTerm = query.trim();

    const products = await Product.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${searchTerm}%` } },
          { description: { [Op.like]: `%${searchTerm}%` } },
          { category: { [Op.like]: `%${searchTerm.toUpperCase()}%` } },
        ],
      },
      order: [["name", "ASC"]],
    });

    res.json({
      products,
      count: products.length,
      query: searchTerm,
    });
  } catch (error) {
    console.error("Search products error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

