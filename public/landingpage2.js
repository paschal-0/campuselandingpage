const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize Express
const app = express();

// Database Connection
mongoose.connect('mongodb://localhost/school', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Body Parser Middleware
app.use(bodyParser.json());

// Serve Static Files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Import the Contact model
const Contact = require('./models/Contact');

// API Route for Contact Form
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(200).json({ message: 'Contact saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error saving contact' });
  }
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


