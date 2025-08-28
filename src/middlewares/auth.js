function authMiddleware(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        return res.redirect('/FormLoginAdmin');
    }
}

module.exports = authMiddleware;