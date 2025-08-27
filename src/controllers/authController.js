const AuthService = require('../Services/AuthService')

exports.FormLogin =(req,res,next)=>{
    res.render('auth/loginClient',{ error: null });
}

exports.LoginClient = (req,res,next)=>{
   return AuthService.LoginClient(req,res);
}

exports.FormRegister =(req,res)=>{
    res.render('auth/RegisterClient',{ error: null });
}

exports.RegisterClient = (req,res,next)=>{
    return AuthService.RegisterClient(req,res)
}

exports.FormLoginAdmin =(req,res)=>{
    res.render('auth/LoginAdmin',{ error: null });
}

exports.LoginAdmin = (req,res,next)=>{
    return AuthService.LoginAdmin(req,res)
}


