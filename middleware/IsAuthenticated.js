const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token === null || !token)
      return res.status(401).json({
        message: "This route requires authentication",
      });

    const user = jwt.verify(token, process.env.ACCESS_JWT_SECRET);
    if (!user) {
      return res.status(401).json({
        message: "Token is Expired",
      });
    }
    req.user = user;
    next();

  } catch(error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({
        message: 'Token is Expired'
    });
}
    
};

module.exports = isAuthenticated