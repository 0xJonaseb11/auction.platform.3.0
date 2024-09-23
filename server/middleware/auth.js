// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateSocket = async (socket, next) => {
  try {
    //   console.log('Socket handshake.auth:', socket.handshake.auth);
      const token = socket.handshake.auth.token;

    if (!token) {
      throw new Error('Token not provided');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('token is ', decoded)
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      throw new Error('User not found');
    }

    socket.user = user;
    next();
  } catch (error) {
    console.error('Socket authentication error:', error);

    if (error.name === 'JsonWebTokenError') {
      return next(new Error('Invalid token'));
    }
    if (error.message === 'User does not have access to inventory') {
      return next(new Error('Unauthorized access to inventory'));
    }

    // next(new Error('Authentication failed'));
  }
};

module.exports = { authenticateSocket };
