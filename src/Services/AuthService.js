const { User } = require('../models/User');
const bcrypt = require('bcrypt');
const validator = require('validator');
const JWT = require('jsonwebtoken');
require('dotenv').config();
let nodemailer = require('nodemailer');
const { random } = require('lodash');
const crypto = require('crypto');



exports.LoginClient = async (req, res) => {
    try {
        let find = null;
        const connect = await User();
        // lưu thông tin nhập
        const { UserNameOrEmail, password } = req.body;

        // xác nhận tài khoản name || email
        if (validator.isEmail(UserNameOrEmail)) {

            find = await connect.findOne({ where: { email: UserNameOrEmail,role_id : 1 } })

        } else {

            find = await connect.findOne({ where: { username: UserNameOrEmail,role_id : 1 } })

        }


        if (!find) return res.render('auth/loginClient', { error: "Tài khoản không tồn tại" })
        console.log(find);
        const math = await bcrypt.compare(password, find.password);

        if (!math) return res.render('auth/loginClient', { error: "Tài khoản hoặc mật khẩu không đúng" })

        // tạo JWT nếu người dùng đăng nhập thành công
        const accessToken = JWT.sign(
            { "username": find.username, "id": find.id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "2h" }
        )

        // gửi token len cookie
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false,
            maxAge: 2 * 60 * 60 * 1000
        })

        res.redirect('/');
    } catch (error) {
        console.log("looix" + error)
        res.redirect('/FormLogin')
    }
}

exports.RegisterClient = async (req, res) => {
    try {
        let connect = await User();

        const { username, email, phone, password } = req.body;

        const bcryptpassword = await bcrypt.hash(password, 10);

        if (await connect.findOne({ where: { username: username } })) {
            res.render('auth/RegisterClient', { error: "Ten da ton tai" })
        } else if (await connect.findOne({ where: { email: email } })) {
            res.render('auth/RegisterClient', { error: "email da ton tai" })
        }

        const data = await connect.create({ username: username, email: email, phone: phone, password: bcryptpassword });

        console.log(data)

        res.redirect('/FormLogin');
    } catch (error) {
        console.error(error); // log lỗi thật ra console
        res.redirect('/FormRegister');
    }
};

exports.sendForgetpassword = async (req, res) => {
    try {
        let connect = await User();

        const  email  = req.body.email;

        console.log(req.body);

        const find = await connect.findOne({ where: { email: email,role_id : 1 } });

        
        if (!find) return res.render('auth/forgotPassword', { error: "email không tồn tại" });

        const code = await crypto.randomBytes(4).toString("hex");

        let transpoter = nodemailer.createTransport({
            service: process.env.GMAIL_SERVICE,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD
            }
        })

        let MailOptions = {
            from: process.env.GMAIL_USER,
            to: find.email,
            subject: "Thay đổi mật khẩu",
            html: `<p> chào bạn mã thay đổi mật khẩu của bạn là : ${code}</p> `
        }

        transpoter.sendMail(MailOptions, function (error, info) {
            if (error) {
                console.log(error)
            } else {
                console.log("Email gửi" + info.response)
            }
        })

        if(req.session.resetEmail && req.session.tokenEmail){
            delete req.session.resetEmail;
            delete req.session.tokenEmail;
        }

        req.session.resetEmail = find.email;
        req.session.tokenEmail = code;

        return res.redirect('/GetFormToken')
    } catch (error) {
        console.log("lỗi" + error)
        return res.redirect('/ForgotPassword')
    }
}

exports.confirmtToken = async (req, res) => {
    try {

        const token1 = req.session.tokenEmail;

         if (!token1) {
        return res.render("auth/forgotPassword", { error: "Hết hạn token" });
        }
        const {token} = req.body;
        
        console.log("mã"+token)

        if(token1 !== token){
           return res.render('auth/tokenPassword',{error:"mã không đúng"})
        }

        req.session.status = true

        delete req.session.tokenEmail

        
        return res.redirect('/FormResetPassword')
    } catch (error) {
        console.log("lỗi" + error);
        res.redirect('/GetFormToken')
    }
}

exports.ResetPasswordUser = async (req, res) => {
    try {
        let connect = await User();

        const { resetPassword } = req.body;
        console.log("password nhập vào:", resetPassword);
        console.log(req.session.resetEmail)
        if (!resetPassword) {
            return res.render("auth/ResetPassword", { error: "Bạn chưa nhập mật khẩu mới" });
        }

        const bcryptPassword = await bcrypt.hash(resetPassword, 10);

        const find = await connect.findOne({ where: { email: req.session.resetEmail } });

        if (!find) {
            return res.render('auth/forgotPassword', { error: "Tài khoản không tồn tại" });
        }

        if (req.session.status) {
            await connect.update(
                { password: bcryptPassword },
                { where: { email: find.email } }
            );
        }

        

        return res.redirect('/FormLogin');

    } catch (error) {
        console.error("lỗi: " + error);
        return res.render('auth/ResetPassword', { error: "Đổi mật khẩu thất bại" });
    }
};




exports.LoginAdmin = async (req, res) => {
     try {
        let find = null;
        const connect = await User();
        // lưu thông tin nhập
        const { UserNameOrEmail, password } = req.body;

        // xác nhận tài khoản name || email
        if (validator.isEmail(UserNameOrEmail)) {

            find = await connect.findOne({ where: { email: UserNameOrEmail,role_id : 3 } })

        }


        if (!find) return res.render('auth/loginAdmin', { error: "Tài khoản không tồn tại" })
        console.log(find);

        const math = await bcrypt.compare(password, find.password);

        if (!math) return res.render('auth/loginAdmin', { error: "Tài khoản hoặc mật khẩu không đúng" })

        // tạo JWT nếu người dùng đăng nhập thành công
        const accessToken = JWT.sign(
            { "username": find.username, "id": find.id,'role_id':find.role_id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "2h" }
        )

        
        // gửi token len cookie
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false,
            maxAge: 2 * 60 * 60 * 1000
        })
        
        res.redirect('/admin/');
    } catch (error) {
        console.log("Lỗi" + error)
        res.redirect('/FormLoginAdmin')
    }
};

