const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { type } = require("express/lib/response");

//  @desc Register User
//  @route POST /api/users
//  @access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please Fill All Fields!");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  console.log(hashedPassword);
  const user = await User.create({ username, email, password: hashedPassword });

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data!");
  }
});

//  @desc Login
//  @route POST /api/users/login
//  @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log(email);

  const user = await User.findOne({ email });

  console.log(user);

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

//  @desc Get User Data
//  @route GET /api/users/me
//  @access public
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user.id);
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
