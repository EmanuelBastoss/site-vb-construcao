const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig'); 
const productController = require('../controllers/productController');


router.post(
    '/',
    upload.single('photo'), 
    productController.createProduct
);


router.get('/', productController.getProducts);


router.get('/:id', productController.getProductById);


router.put('/:id', productController.updateProduct);


router.post(
    '/:id/photo',
    upload.single('newPhoto'), 
    productController.updateProductPhoto
);


router.delete('/:id', productController.deleteProduct);


module.exports = router;

