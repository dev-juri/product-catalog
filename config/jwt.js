const jwtConfig = {
    secret : process.env.JWT_SECRET,
    iss : process.env.JWT_ISSUER,
    audience : process.env.JWT_AUDIENCE,
    exp : process.env.JWT_EXPIRATION || "12h",
    algo: process.env.JWT_ALGO,
}

module.exports = jwtConfig;