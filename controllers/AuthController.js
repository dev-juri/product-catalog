const User = require("../models/UserModel.js");
const bcrypt = require("bcryptjs");
const { generateToken, verifyToken } = require("../jwt/JwtHelper.js");

const loginUser = async (req, res, next) => {
  try {
    let user = null;
    // Find user in the DB
    user = await User.findOne({ email: req.body.email }).select("+password");

    if (!user) {
      return res
        .status(404)
        .json({ status: false, error: "User with the email does not exist" });
    }

    // Compare password with bcrypt
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ status: false, error: "Invalid login credentials" });
    }

    // Generate JWT token
    const accessToken = generateToken(user, false);
    const refreshToken = generateToken(user, true);

    // Save refresh token in DB
    await User.findByIdAndUpdate(user._id, { refreshToken }, { new: true });

    // Return
    return res.status(200).json({
      status: true,
      message: "User successfully logged in",
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;

  try {
    // Verify the token
    const jwtUser = verifyToken(refreshToken);

    if (!jwtUser) {
      return res.status(401).json({ status: false, error: "Invalid token" });
    }

    let user = await User.findById(jwtUser.id).select("+refreshToken");

    if (!user) {
      return res
        .status(404)
        .json({ status: false, error: "User not found" });
    }

    // Check validity of refresh token
    if (user.refreshToken != refreshToken) {
      return res
        .status(401)
        .json({ status: false, error: "Session Expired, please login" });
    }

    // Generate new accessToken if refresh token is valid
    const token = generateToken(user, false);

    return res.status(200).json({
      status: true,
      message: "Access token generated successfully",
      data: {
        accessToken: token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { loginUser, refreshToken };
