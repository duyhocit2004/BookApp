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

exports.ForgotPassword =(req,res,next)=>{
    res.render('auth/forgotPassword')
}

exports.sendForgetpassword = (req,res)=>{
    return AuthService.sendForgetpassword(req,res)
}

exports.GetFormToken = (req,res)=>{
    res.render('auth/tokenPassword')
}

exports.confirmtToken = (req,res)=>{
    return AuthService.confirmtToken(req,res)
}

exports.FormResetPassword = (req,res)=>{
    res.render('auth/ResetPassword')
}

exports.ResetPasswordUser = (req,res)=>{
    return AuthService.ResetPasswordUser(req,res)
}