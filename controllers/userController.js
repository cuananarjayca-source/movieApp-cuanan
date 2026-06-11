const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/authMiddleware');


// Helper function to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};


exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;


    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }


    const user = await User.create({ name, email, password });

    return res.status(201).json({
      message: 'Registered successfully',
      _id: user._id,
      name: user.name,
      email: user.email
    });
  } catch (error) {

    if (typeof next === 'function') {
      return next(error);
    }
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;


    const user = await User.findOne({ email });


    if (user && (await user.matchPassword(password))) {

      return res.status(200).json({
        access: generateToken(user._id),
      });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.getUserDetails = async (req, res) => {
  try {

    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }


    return res.status(200).json({
      user: {
        _id: req.user._id,
        email: req.user.email,
        isAdmin: req.user.isAdmin || false,
        __v: req.user.__v ?? 0
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};