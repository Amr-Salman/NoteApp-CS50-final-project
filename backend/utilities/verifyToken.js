const jwt = require('jsonwebtoken');
const User = require('../api/models/userModel');

const verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers['authorization'];

  // check if there is no token
  if (bearerHeader === undefined) {
    return res
      .status(403)
      .json({ status: false, message: 'Unauthorized user' });
  }

  // Get the token
  const token = bearerHeader.split(' ')[1];

  // Verify the token and get the user from the database
  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    if (decoded) {
      const user = await User.findById(decoded.id);
      req.user = user;
      next();
    }
  } catch (error) {
    return res.status(403).json({ status: false, message: 'Wrong token' });
  }
};
module.exports = verifyToken;
