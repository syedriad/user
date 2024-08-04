
// mongodb+srv://test:<password>@cluster0.iua9bmt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://test:test123@cluster0.iua9bmt.mongodb.net/testdb?retryWrites=true&w=majority&appName=Cluster0', {
  
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  active: Boolean,
  role: String,
});

const User = mongoose.model('User', userSchema);

// Routes
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/users/:id/active', async (req, res) => {
    try {
      const userId = req.params.id;
      const { active } = req.body;
      const user = await User.findByIdAndUpdate(userId, { active }, { new: true });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error updating active state' });
    }
  });


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
