const protect = (roles = []) => {
    return (req, res, next) => {
        if (!req.session.userId) {
            return res.redirect('/login.html'); // Not logged in
        }
        if (roles.length && !roles.includes(req.session.role)) {
            return res.status(403).send('Unauthorized Access'); // Wrong role
        }
        next();
    };
};

module.exports = { protect };