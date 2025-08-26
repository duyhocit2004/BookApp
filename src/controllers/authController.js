const AuthService = require('../Services/AuthService')

exports.FormLogin =(req,res,next)=>{
    res.render('auth/loginClient');
}

exports.LoginClient = (req,res,next)=>{
   return AuthService.FormLogin(req,res);
}