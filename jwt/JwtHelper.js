var jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");

const generateToken = (user, refresh) => {

    return jwt.sign({
        id: user._id,
        email: !refresh ? user.email : undefined,
        name: !refresh ? user.fullName : undefined,
      },
      jwtConfig.secret,
      {
        expiresIn: refresh? jwtConfig.expRefresh : jwtConfig.expAccess,
        issuer: jwtConfig.iss,
        audience: jwtConfig.audience,
        algorithm: jwtConfig.algo
      }
    );
}

const verifyToken = (token) => {
    return jwt.verify(token, jwtConfig.secret);
}

module.exports = { generateToken, verifyToken };