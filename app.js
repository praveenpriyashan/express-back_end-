const express = require('express');
const mongoose=require('mongoose');
const routes = require('./routes');
const app=express();

app.use(express.json());
mongoose.connect('mongodb://localhost:27017/testMongo',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.error('Error connecting to MongoDB',err);
    process.exit(1);
})
app.use(routes)

app.listen(8080,()=>{
     console.log('Server running on port 8080');
})



