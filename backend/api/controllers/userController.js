const User = require('../models/userModel');
const validation = require('../../utilities/validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const genToken = (data) => {
  return jwt.sign(data, process.env.JWT_PRIVATE_KEY);
};

const signup = async (req, res) => {
  // Validate the inputs
  const validate = validation.signup(req.body);
  if (validate.error) {
    return res.status(400).json({ message: validate.message, payload: {} });
  }

  try {
    const userExist = await User.find({ email: req.body.email });
    if (userExist.length !== 1) {
      // Hashing password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // Create user and send response
      const user = await User.create({ ...req.body, password: hashedPassword });
      res.status(201).json({
        message: 'User created successfully',
        payload: { token: genToken({ id: user._id }), username: user.username },
      });
    } else {
      // Sending error if the email exists
      res.status(400).json({
        message: 'Email already used',
        payload: {},
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'idk', payload: {} });
  }
};

const login = async (req, res) => {
  const validate = validation.login(req.body);
  if (validate.error) {
    return res.status(400).json({ message: validate.message, payload: {} });
  }
  try {
    const user = await User.findOne({ email: req.body.email });
    const validate = await bcrypt.compare(req.body.password, user.password);
    if (validate) {
      res.status(200).json({
        message: 'User logged in successfully',
        payload: { token: genToken({ id: user._id }), username: user.username },
      });
    } else {
      res.status(400).json({
        message: 'Wrong Credentials',
        payload: {},
      });
    }
  } catch (error) {
    res.status(400).json({ message: 'No such a user', payload: {} });
  }
};

module.exports = {
  login,
  signup,
};
