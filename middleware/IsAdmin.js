const isAdmin = (req, res, next) => {
  try {
    const user = req.user; 

    if (!user || !user.isAdmin) {
      return res.status(403).json({
        message: "Access forbidden. Admin privileges required.",
      });
    }

    next();
  } catch (error) {
    console.error('Error checking admin status:', error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

module.exports = isAdmin;