const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ---- MONGO CONNECTION ----
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("DB Error:", err));


// ---- USER MODEL ----
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);


// ---- FOOD MODEL ----
const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    daysAfterIAte: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
const Food = mongoose.model('Food', foodSchema);


// ---- VERIFY TOKEN MIDDLEWARE ----
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']; // could be 'Bearer <token>'
  if (!authHeader) return res.status(401).send('No token provided');

  const token = authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]  // extract token
    : authHeader;               // still accept raw token

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send('Invalid token');
    req.userId = decoded.userId;
    next();
  });
};



// ---- REGISTER USER ----
app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send("User already exists");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            password: hashedPassword
        });

        await user.save();
        res.status(201).send("User registered successfully");

    } catch (error) {
        console.log("Registration Error:", error);   // <-- Add this
        res.status(500).send("Error registering user");
    }
});



// ---- LOGIN USER ----
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(400).send("Invalid username or password");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).send("Invalid username or password");

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });

    } catch (error) {
        res.status(500).send("Server error");
    }
});


// ---- ADD FOOD (Protected Route) ----
app.post('/api/food', verifyToken, async (req, res) => {
    try {
        const { name, daysAfterIAte } = req.body;

        const food = new Food({
            name,
            daysAfterIAte,
            user: req.userId
        });

        await food.save();
res.status(201).json(food);


    } catch (error) {
        res.status(500).send("Error adding food");
    }
});

app.get('/api/food', verifyToken, async (req, res) => {
    try {
        const foods = await Food.find({ user: req.userId });                
        res.json(foods);
    } catch (error) {
        res.status(500).send("Error fetching foods");
    }
});
app.put('/api/food/:id', verifyToken, async (req, res) => {
    try {
        const { name, daysAfterIAte } = req.body;
        const foodId = req.params.id;
        const food = await Food.findOneAndUpdate(
            { _id: foodId, user: req.userId },
            { name, daysAfterIAte },
            { new: true }
        );  
        if (!food) return res.status(404).send("Food not found");
        res.json(food);
    } catch (error) {
        res.status(500).send("Error updating food");
    }
});

app.delete('/api/food/:id', verifyToken, async (req, res) => {
    try {
        const foodId = req.params.id;
        const food = await Food.findOneAndDelete({ _id: foodId, user: req.userId });
        if (!food) return res.status(404).send("Food not found");
        res.send("Food deleted successfully");
    } catch (error) {
        res.status(500).send("Error deleting food");
    }
});

// ---- START SERVER ----
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});