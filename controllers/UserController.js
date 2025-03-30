const User = require("../models/UserModel");

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

  // return response
  delete newUser.password;

  return res.status(201).json({
    status: true,
    message: "User successfully registered",
  });
};

const updateUserDetails = async (req, res, next) => {
  // Check if user exists in the db
  let user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ status: false, error: "User not found" });
  }

  // Update user details
  let updatedUser = await User.findByIdAndUpdate(user._id, req.body, {
    new: true,
  });

  return res
    .status(200)
    .json({
      status: true,
      message: "User successfully updated",
      data: updatedUser,
    });
};

const deleteUser = async (req, res, next) => {
  // Check if user exists in the db
  let user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ status: false, error: "User not found" });
  }

  // Soft delete user
  await User.findByIdAndUpdate(user._id, { deletedAt: new Date() });
  return res.status(200).json({
    status: true,
    message: "User successfully deleted",
  });
};

module.exports = { registerUser, updateUserDetails, deleteUser };
