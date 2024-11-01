const Product = require('../model/Product')


const createProduct = async (req, res) => {
    const {name, price, description, quantity} = req.body;
    try {
        const product = new Product();
        product.name = name;
        product.price = price;
        product.description = description;
        product.quantity = quantity;
        await product.save();
        res.status(201).send(product);
    } catch (e) {
        res.status(400).send(e);
    }
}
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products)
    } catch (e) {
        res.status(400).send(e + "  product not found");
    }
}
const getProductById = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findById(productId);
        res.status(200).send(product)
    } catch (e) {
        res.status(400).send(e + "  product not found");
    }
}

const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const {name, price, description, quantity} = req.body;

    try {
        const existProduct = await Product.findById(productId);
        if (!existProduct) {
            return res.status(404).send('Product not found');
        }
        existProduct.name = name;
        existProduct.price = price;
        existProduct.description = description;
        existProduct.quantity = quantity;
        await existProduct.save();
        res.status(200).send(existProduct);
    } catch (e) {
        res.status(400).send(e + "  product not updated");
    }
}
const deleteProduct = async (req, res) => {
    const productId=req.params.product
    try {
        await Product.deleteOne(productId);
        res.status(200).send('Product deleted');
    } catch (e) {
        res.status(400).send(e + "  product not deleted");
    }
}
module.exports = {createProduct, getAllProducts, getProductById,updateProduct,deleteProduct}
