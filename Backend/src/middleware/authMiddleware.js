const protect = (roles = []) => {
  return (req, res, next) => {
    if (!req.session.userId) {
      return res.redirect('/login.html');
    }

    if (roles.length && !roles.includes(req.session.role)) {
      return res.status(403).json({ message: 'Unauthorized Access' });
    }

    next();
  };
};

module.exports = { protect };