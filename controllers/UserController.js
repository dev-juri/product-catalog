const {User} = require("../models/UserModel");

const registerUser = async (req, res, next) => {
  let user = null;
  // Check if user exists in the db
  user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(409).json({status: false, error: "User with the email already exists"});
  }

  // Create new user if not
  let newUser = new User(req.body);
  await newUser.save();
  
  // return response
  delete newUser.password

  return res.status(201).json({
    status: true,
    message: "User successfully registered"
  })
};

module.exports = { registerUser };
