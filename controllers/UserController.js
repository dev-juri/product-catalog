const User = require("../models/UserModel.js");

const registerUser = async (req, res, next) => {
  let user = null;
  // Check if user exists in the db
  user = await User.findOne({ email: req.body.email });

  if (user) {
    return res
      .status(409)
      .json({ status: false, error: "User with the email already exists" });
  }

  // Create new user if not
  let newUser = new User(req.body);
  await newUser.save();

  return res.status(201).json({
    status: true,
    message: "User successfully registered",
  });
};

const updateUserDetails = async (req, res, next) => {
  let user = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
  });

  if (!user) {
    return res.status(404).json({ status: false, error: "User not found" });
  }

  return res.status(200).json({
    status: true,
    message: "User successfully updated",
    data: user,
  });
};

const deleteUser = async (req, res, next) => {
  let user = await User.findByIdAndUpdate(req.user._id, {
    deletedAt: new Date(),
  });

  if (!user) {
    return res.status(404).json({ status: false, error: "User not found" });
  }

  return res.status(200).json({
    status: true,
    message: "User successfully deleted",
  });
};

module.exports = { registerUser, updateUserDetails, deleteUser };
