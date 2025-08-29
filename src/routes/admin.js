const express = require('express');
const multer = require('multer');
const Routers = express.Router();

//Controller
const AdminController = require('../controllers/adminController')


// Cấu hình lưu file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/images'); // thư mục lưu file (không có "/")
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
        if (file.mimetype.startsWith('/image')) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed"), false);
        }
    }
});



Routers.get("/",AdminController.Admin);


Routers.post('/upload', upload.single('file'), (req, res) => {
    res.json({ message: 'File uploaded successfully', file: req.file });
});

module.exports = Routers;
