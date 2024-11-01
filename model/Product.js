const mongoose=require('mongoose');

const ProductSchema=new mongoose.Schema({
    name:String,
    price:Number,
    description:String,
    quantity:Number,
    createdAt:{type:Date,default:Date.now}
})
module.exports=mongoose.model('Product',ProductSchema)