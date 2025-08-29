const JWT = require('jsonwebtoken')
require('dotenv').config()
function authMiddleware(req, res, next) {
    
    const token = req.cookies.accessToken

    if(!token) return res.redirect('/FormLoginAdmin');

    const decoded = JWT.verify(token,process.env.ACCESS_TOKEN_SECRET);
    
    if(!decoded) return res.redirect('/FormLoginAdmin')

    if (decoded.role_id === 3) return next();

    else return res.redirect('/FormLoginAdmin');
    
}

module.exports = authMiddleware;