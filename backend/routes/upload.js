const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();


// FOR ConfigurING Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../upload_images'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});


const upload = multer({ storage });


// Upload route
router.post('/', upload.array('images'), (req, res) => {
    try {
        res.status(200).json({ message: 'Images uploaded successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Upload failed', error });
    }
});


module.exports = router;