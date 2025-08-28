const express = require('express');
const multer = require('multer');
const Routers = express.Router();

//Controller
const HomeController = require('../controllers/homeController')
const AuthController = require('../controllers/authController')
const AdminController = require('../controllers/adminController')
const authMiddleware = require('../middlewares/auth');

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


Routers.get('/', HomeController.Home);

Routers.get('/FormLogin', AuthController.FormLogin);
Routers.post('/LoginClient', AuthController.LoginClient);

Routers.get('/FormRegister', AuthController.FormRegister);
Routers.post('/RegisterClient', AuthController.RegisterClient);

Routers.get('/ForgotPassword',AuthController.ForgotPassword);
Routers.post('/sendForgetpassword',AuthController.sendForgetpassword);

Routers.get('/GetFormToken',AuthController.GetFormToken);
Routers.post('/confirmtToken',AuthController.confirmtToken);

Routers.get('/FormResetPassword',AuthController.FormResetPassword);
Routers.post('/ResetPasswordUser',AuthController.ResetPasswordUser);
Routers.get('/FormLoginAdmin', AuthController.FormLoginAdmin);
Routers.post('/LoginAdmin', AuthController.LoginAdmin);

// Middleware trang d
Routers.get('/admin', authMiddleware, (req, res) => {
    router.render('admin'); 
});

Routers.post('/upload', upload.single('file'), (req, res) => {
    res.json({ message: 'File uploaded successfully', file: req.file });
});

module.exports = Routers;
