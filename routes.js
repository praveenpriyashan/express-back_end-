const express = require('express')
const router = express.Router();
const {getAllUsers} = require('./controllers/UserController.js');
const {createUser} = require('./controllers/UserController.js');
const {getUserById, updateUser, deleteUser} = require("./controllers/UserController");
const {createProduct} = require("./controllers/ProductController.js");
const {getAllProducts, getProductById, updateProduct, deleteProduct} = require("./controllers/ProductController");
const {createOrder, addProductToOrders, getAllOrders} = require("./controllers/OrderController");
const {login} = require("./controllers/AuthController");
const {verifyToken} = require("./security/Security");

router.post('/auth/login', login)
router.use(verifyToken)

router.post('/users', createUser);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

router.post('/products', createProduct);
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);


router.post('/orders', createOrder);
router.get('/orders', getAllOrders);
router.post('/orders/:id/addProduct', addProductToOrders);


module.exports = router;