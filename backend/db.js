const mongoose=require('mongoose');

const uri='mongodb+srv://kousikaa:root@cluster0.m7cjh72.mongodb.net/?appName=Cluster0'
mongoose.connect(uri)
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB database connection established successfully");
})