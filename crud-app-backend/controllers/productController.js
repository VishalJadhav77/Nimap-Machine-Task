const Product = require('../models/product');
const Category = require('../models/category');

exports.getAllProducts = async (req, res) => {
  try {
    const { page = 1, size = 10 } = req.query;
    const offset = (page - 1) * size;

    const products = await Product.findAndCountAll({
      limit: parseInt(size),
      offset: parseInt(offset),
      include: [{ model: Category, as: 'category' }],
    });

    res.status(200).json({
      totalItems: products.count,
      products: products.rows,
      totalPages: Math.ceil(products.count / size),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.update(req.body, { where: { id } });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
