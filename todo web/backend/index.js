require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const TodoModel = require('./models/Todo'); // Make sure you have the Todo model created

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

// Create a new todo
app.post('/todos', async (req, res) => {
  const { title, description, dueDate } = req.body;

  const todo = new TodoModel({
    title,
    description,
    dueDate
  });

  try {
    await todo.save();
    res.status(201).send('✅ Todo item created');
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await TodoModel.find({});
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update a todo (title, description, isCompleted, dueDate)
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, isCompleted, dueDate } = req.body;

  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      id,
      { title, description, isCompleted, dueDate },
      { new: true } // return updated document
    );

    if (!updatedTodo) {
      return res.status(404).send('❌ Todo item not found');
    }

    res.status(200).send('✅ Todo item updated');
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).send('❌ Todo item not found');
    }

    res.status(200).send('✅ Todo item deleted');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
