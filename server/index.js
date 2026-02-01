require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const requirementRoutes = require('./routes/requirements');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000" 
}));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

app.get('/', (req, res) => {
    res.send('GoPratle Backend is Running');
});

app.use('/api/requirements', requirementRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});