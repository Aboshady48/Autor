const express = require('express');
const productRouter = express.Router();
const createProductController = require('../Controllers/create-product.controller.js');
const getAllProductsController = require('../Controllers/get-all-products.controller.js');
const getProductByIdController = require('../Controllers/get-product-by-id.controller.js');
const updateProductController = require('../Controllers/update-product.controller.js');
const deleteProductController = require('../Controllers/delete-product.controller.js');

productRouter.get('/', getAllProductsController)// Get all products
productRouter.get('/:productId', getProductByIdController) // Get product by ID
productRouter.post('/', createProductController) // Create a new product (for admin only)
productRouter.put('/:productId',updateProductController) // Update a product by ID (for admin only)
productRouter.delete('/:productId',deleteProductController) // Delete a product by ID (for admin only)



module.exports = productRouter;