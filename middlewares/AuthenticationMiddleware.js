const User = require("../models/UserModel");
const { verifyToken } = require("../jwt/JwtHelper");

const isAuthenticatedUser = async (req, res, next) => {
  try {
    let token;
    let headers = req.headers["authorization"];

    if (!headers || !headers.startsWith("Bearer ")) {
      return res.status(401).json({ status: false, error: "Unauthorized" });
    }

    token = headers.split(" ")[1];
    if (!token) {
      return res.status(401).json({ status: false, error: "Unauthorized" });
    }

    const jwtUser = verifyToken(token);

    if (!jwtUser) {
      return res.status(401).json({ status: false, error: "Invalid token" });
    }

    let user = await User.findById(jwtUser.id);
    if (!user) {
      return res.status(401).json({ status: false, error: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { isAuthenticatedUser };
