const express = require('express');
const multer = require('multer');
const Routers = express.Router();
const fs = require('fs')

//Controller
const AdminController = require('../controllers/adminController');
const ProductController = require('../controllers/admin/ProductController');
const UserController = require('../controllers/admin/UserController');
const PostController = require('../controllers/admin/PostController');
const CategoryController = require('../controllers/admin/CategoryController')

// Cấu hình lưu file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/public/images/'); // thư mục lưu file (không có "/")
    },
    filename: (req, file, cb) => {
        const filename = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, filename + '-' + file.originalname);
    }
});

// Cấu hình multer
const upload = multer({
    storage: storage,
    // fileFilter: (req, file, cb) => {
    //     // Chỉ cho phép file hình ảnh
    //     if (file.mimetype.startsWith('/images')) {
    //         cb(null, true);
    //     } else {
    //         cb(new Error("Only image files are allowed"), false);
    //     }
    // }
});


Routers.get("/", AdminController.Admin);

Routers.get('/ListProduct', ProductController.ListProduct);
Routers.post('/status/:id', ProductController.statusProduct);

Routers.get('/ListCategory', CategoryController.ListCategory);
Routers.get('/AddCategory', CategoryController.AddCategory);
Routers.post('/PostCategory', CategoryController.PostCategory);
Routers.get('/EditCategory/:id', CategoryController.EditCategory);
Routers.post('/UpdateCategory/:id', CategoryController.UpdateCategory);
Routers.delete('/DeleteCategory/:id', CategoryController.DeleteCategory);

Routers.get('/AccountUser', UserController.AccountUser);
Routers.get('/AccountBusiness', UserController.AccountBusiness);
Routers.get('/DetailAccount/:id', UserController.GetDetailAccount);
Routers.post('/UpdateAccount/:id', UserController.UpdateAccount)

Routers.get('/ListPost',PostController.GetListPost);
Routers.get('/FormAddPost',PostController.FormAddPost);
Routers.post('/AddPost', upload.single('image'),PostController.AddPost);
Routers.get('/FormEdit/:id',PostController.FormEdit);
Routers.put('/EditPost/:id', upload.single('image'),PostController.EditPost);
Routers.delete('/delete/:id',PostController.DeletePost);

Routers.post('/upload', upload.single('file'), (req, res) => {
    res.json({ message: 'File uploaded successfully', file: req.file });
});

module.exports = Routers;
