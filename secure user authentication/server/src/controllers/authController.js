import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

const sendUserResponse = (user, res, statusCode = 200) => {
  res.status(statusCode).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  });
};

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });
    const user = await User.create({ name, email, password });
    sendUserResponse(user, res, 201);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    sendUserResponse(user, res);
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res) => {
  res.json(req.user);
};

export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (req.body.email && req.body.email !== user.email) {
      const taken = await User.findOne({ email: req.body.email });
      if (taken) return res.status(400).json({ message: 'Email already in use' });
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    const updated = await user.save();
    res.json({ _id: updated._id, name: updated.name, email: updated.email, role: updated.role });
  } catch (error) {
    next(error);
  }
};
