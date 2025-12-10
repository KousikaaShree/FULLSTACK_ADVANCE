require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const FoodModel = require('./models/Food');

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB connection with logging
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err));
  

app.use(cors());
app.use(express.json());

// Your routes here...


app.post('/insert', async (req, res) => {
  const { foodName, daysSinceIAte } = req.body;
  const food = new FoodModel({ foodName, daysSinceIAte });

  try {
    await food.save();
    res.status(201).send('Food item inserted');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/read', async (req, res) => {
  try {
    const foodItens = await FoodModel.find({});
    res.status(200).json(foodItens);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/update', async (req, res) => {
  const { id, newFoodName } = req.body;

  try {
    await FoodModel.findByIdAndUpdate(id, { foodName: newFoodName });
    res.status(200).send('Food item updated');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await FoodModel.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).send('Food item not found');
    }

    res.status(200).send('Food item deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting food item');
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
