const User = require('../model/User');
const mongoose = require('mongoose');
const {hashPassword} = require("../security/Security");

const createUser = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const user = new User();
        user.name = name;
        user.password = hashPassword(password.toString())
        user.email = email;
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e + "  createUser Error");
    }
}
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (e) {
        res.status(400).send(e + "        Users not found");
    }
}
const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        res.status(200).send(user)
    } catch (e) {
        res.status(404).send(e + "      User not found");
    }
}
const updateUser = async (req, res) => {
    const userID = req.params.id;
    const {name, email, password} = req.body;
    try {
        const exitUser = await User.findById(userID);
        if (!exitUser) {
            return res.status(404).send('User not found');
        }
        exitUser.name = name;
        exitUser.email = email;
        exitUser.password = password;
        await exitUser.save();
        res.status(200).send(exitUser);
    } catch (e) {
        res.status(400).send(e + "      User not updated");
    }
}
const deleteUser = async (req, res) => {
    const userId = req.param.id;
    try {
        await User.deleteOne(userId)
        res.status(200).send('User deleted');
    } catch (e) {
        res.status(400).send(e + "      User not deleted");
    }
}

module.exports = {createUser, getAllUsers, getUserById, updateUser, deleteUser}