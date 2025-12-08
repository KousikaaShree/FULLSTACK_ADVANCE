const express = require('express');
const app = express();
require('dotenv').config();
require('./db');
const mongoose=require('mongoose');

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.put('/users',(req,res)=>{
//     res.send('PUT request to /users');
// });
app.get('/',(req,res)=>{
    res.send('Welcome to the Home Page');
});

const userSchema = new mongoose.Schema({
    username: {type:String, required:true},
    email: {type:String, required:true,unique:true},
    age: {type:Number, required:true},
})
const User = mongoose.model('User',userSchema)

const newUSer = new User({
    username: "koushi",
    email: "koushi@example.com",
    age: 25
})
newUSer.save().then(()=>{
    console.log("User saved successfully");
}).catch((err)=>{
    console.log("Error saving user:", err);
})

app.get('/users/:userID',(req,res)=>{
    const userID=req.params.userID;
    res.send(`USer ID is : ${userID}`)
})

app.get('/users/:userID/profile',(req,res)=>{
    // const userID=req.params.userID;
    const name=req.query.name;
    const age=req.query.age;
    res.send(`Profile page for data id:,Name:${name},Age:${age}`);//http://localhost:3000/users/7/profile?name=gowri&age=21
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});