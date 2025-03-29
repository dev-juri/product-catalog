const jwtConfig = require("../config/jwt");
const { User } = require("../models/UserModel");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const loginUser = async (req, res, next) => {
  let user = null;
  // Find user in the DB
  user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({status: false, error: "User with the email does not exist"});
  }

  // Compare password with bcrypt
  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isPasswordValid) {
    return res.status(401).json({status: false, error: "Invalid login credentials"});
  }

  // Generate JWT token
  const accessToken = jwt.sign({
      id: user._id,
      email: user.email,
      name: user.fullName,
    },
    jwtConfig.secret,
    {
      expiresIn: jwtConfig.exp,
      issuer: jwtConfig.iss,
      audience: jwtConfig.audience,
      algorithm: jwtConfig.algo
    }
  );

  // Return
  return res.status(200).json({
    status: true,
    message: "User successfully logged in",
    data: {
      accessToken: accessToken,
    },
  });
};

module.exports = { loginUser };
