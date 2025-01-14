const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Define product routes
router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router; // Export the product routes
