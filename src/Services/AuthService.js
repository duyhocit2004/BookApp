const {User} = require('../models/User');
const bcrypt = require('bcrypt');
const validator = require('validator');
const JWT = require('jsonwebtoken');
require('dotenv').config();



exports.LoginClient = async (req, res) => {
    try {
        let find = null;
        const connect = await User();
        // lưu thông tin nhập
        const {UserNameOrEmail, password } = req.body;
         
        // xác nhận tài khoản name || email
        if (validator.isEmail(UserNameOrEmail)) {
            
            find = await connect.findOne({ where: { email: UserNameOrEmail } })

        } else {

            find = await connect.findOne({ where: { username: UserNameOrEmail } })
            
        }

       
        if(!find) return res.render('auth/loginClient',{error : "Tài khoản không tồn tại"})
        console.log(find);
        const math = await bcrypt.compare(password,find.password);

        if(!math) return res.render('auth/loginClient',{error : "Tài khoản hoặc mật khẩu không đúng"})
        
        // tạo JWT nếu người dùng đăng nhập thành công
        const accessToken = JWT.sign(
            {"username":find.username,"id" :find.id},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn :"2h"}
        )

        // gửi token len cookie
        res.cookie('accessToken',accessToken,{
            httpOnly:true,
            secure:false,
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
        
        if( await connect.findOne({where : {username :username }})){
            res.render('auth/RegisterClient',{error :"Ten da ton tai"})
        }else if(await connect.findOne({where : {email :email }})){
            res.render('auth/RegisterClient',{error :"email da ton tai"})
        }

        const data = await connect.create({ username :username , email:email, phone:phone, password: bcryptpassword });

        console.log(data)

        res.redirect('/FormLogin');
    } catch (error) {
        console.error(error); // log lỗi thật ra console
        res.redirect('/FormRegister');
    }
};

