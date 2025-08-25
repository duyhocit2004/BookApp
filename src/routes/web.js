const express = require('express');
const multer = require('multer');
const Routers = express.Router();

//Controller
const productController = require('../controllers/productController');

//Model

// Cấu hình lưu file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/public/image/'); // thư mục lưu file (không có "/")
    },
    filename: (req, file, cb) => {
        const filename = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, filename + '-' + file.originalname);
    }
});

// Cấu hình multer
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Chỉ cho phép file hình ảnh
        if (file.mimetype.startsWith('/public/image/')) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed"), false);
        }
    }
});


Routers.get('/product', productController.duy);


Routers.post('/upload', upload.single('file'), (req, res) => {
    res.json({ message: 'File uploaded successfully', file: req.file });
});

module.exports = Routers;
