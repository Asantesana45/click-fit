const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const uploadRoutes = require('./routes/upload');


const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


// Routes
app.use('/api/upload', uploadRoutes);


// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});