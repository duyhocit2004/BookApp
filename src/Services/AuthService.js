const {User} = require('../models/User');
const bcrypt = require('bcrypt');
const validator = require('validator');
const JWT = require('jsonwebtoken');
require('dotenv').config();

exports.FormLogin = async (req, res) => {
    try {
        // kết nối với model
        const connect = await User();

        // lưu thông tin nhập
        const { NameOrEmail, password } = req.body;

        // xác nhận tài khoản name || email
        if (validator.isEmail(NameOrEmail)) {

            var find = await connect.findOne({ where: { email: NameOrEmail } })

        } else {

            var find = await connect.findOne({ where: { name: NameOrEmail } })
            
        }

        if(!find) return res.render('auth/loginClient',{title : "Tài khoản không tồn tại"})

        const math = await bcrypt.compare(password,find.password);

        if(!math) return res.render('auth/loginClient',{title : "Tài khoản hoặc mật khẩu không đúng"})
        
        // tạo JWT nếu người dùng đăng nhập thành công
        const accessToken = JWT.sign(
            {"username":find.name},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn :"2h"}
        )

        // gửi token len cookie
        res.cookie('accessToken',accessToken,{
            httpOnly:true,
            secure:false,
            maxAge:2*60*60*100
        })

        res.redirect('index',200);
    } catch (error) {
        res.redirect('/login')
    }
}