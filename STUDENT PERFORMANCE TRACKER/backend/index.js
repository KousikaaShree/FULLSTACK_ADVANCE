require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;


mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error:", err));


const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    passwordHash: String,
  })
);

const Student = mongoose.model(
  "Student",
  new mongoose.Schema({
    name: String,
    rollNo: String,
    className: String,
  })
);

const Performance = mongoose.model(
  "Performance",
  new mongoose.Schema({
    studentId: String,
    subject: String,
    marks: Number,
  })
);


function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "Token missing" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ msg: "Invalid token" });
  }
}


app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ msg: "Email already exists" });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ name, email, passwordHash });
  await user.save();

  res.json({ msg: "Registration successful" });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ token, user: { id: user._id, name: user.name } });
});


app.post("/api/students", auth, async (req, res) => {
  const s = new Student(req.body);
  await s.save();
  res.json(s);
});

app.get("/api/students", auth, async (req, res) => {
  const list = await Student.find();
  res.json(list);
});

app.put("/api/students/:id", auth, async (req, res) => {
  const s = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(s);
});

app.delete("/api/students/:id", auth, async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});


app.post("/api/performance", auth, async (req, res) => {
  const p = new Performance(req.body);
  await p.save();
  res.json(p);
});

app.get("/api/performance/:studentId", auth, async (req, res) => {
  const list = await Performance.find({ studentId: req.params.studentId });
  res.json(list);
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
