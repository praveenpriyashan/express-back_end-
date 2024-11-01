const Order = require('../model/Order');
// const {models} = require("mongoose");

const createOrder = async (req, res) => {
    const {user} = req.body;
    try {
        const order = new Order();
        order.user = user;
        await order.save();
        res.status(200).send(order);
    } catch (e) {
        res.status(400).send(e + "    order not created");
    }
}
const addProductToOrders = async (req, res) => {
    const orderId = req.params.id;
    const {product, quantity} = req.body;

    try {
        const existOrder = await Order.findById(orderId);
        if (!existOrder) return res.status(404).send('Order not found');

        existOrder.products.push({product, quantity});
        await existOrder.save();
        res.status(200).send(existOrder);
    } catch (e) {
        res.status(400).send(e + "    product not added to order");
    }
}
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
        res.status(200).send(orders)
    } catch (e) {
        res.status(400).send(e + "    orders not found");
    }
}
module.exports = {createOrder, addProductToOrders,getAllOrders}