const mongoose = require('mongoose');

// Define the schema for a To-Do item
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // Title is required
    },
    description: {
        type: String,
        required: false, // Description is optional
    },
    isCompleted: {
        type: Boolean,
        default: false, // By default, a task is not completed
    },
    dueDate: {
        type: Date,
        required: false, // Optional due date
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically store creation date
    }
});

// Create the model
const Todo = mongoose.model('Todo', todoSchema);

// Export the model
module.exports = Todo;
