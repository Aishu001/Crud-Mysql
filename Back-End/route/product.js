import express from 'express';
import { createProduct, deleteProducts, getProduct, getProductByID, updateProduct } from '../controller/product.js';

const router = express.Router();

router.route('/createProducts').post(createProduct);
 router.route('/getProducts').get(getProduct)
 router.route('/getProductsById/:id').get(getProductByID)
 router.route('/updateProducts/:id').put(updateProduct)
router.route('/deleteProducts/:id').delete(deleteProducts)

export const productRouter = router;