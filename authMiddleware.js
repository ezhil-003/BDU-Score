// Create a file named 'authMiddleware.js'
const jwt = require('jsonwebtoken');
const registermodule = require('./register');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'mtech123'); // Replace with your secret key

    const user = await registermodule.findOne({ _id: decoded._id, 'tokens': token });

    if (!user) {
      throw new Error();
    }

    req.user = user; // Attach user data to the request object
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate.' });
  }
};

module.exports = authMiddleware;