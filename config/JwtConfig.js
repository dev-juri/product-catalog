const jwtConfig = {
    secret : process.env.JWT_SECRET,
    iss : process.env.JWT_ISSUER,
    audience : process.env.JWT_AUDIENCE,
    expAccess : process.env.JWT_EXPIRATION || "12h",
    expRefresh : process.env.JWT_EXPIRATION_REFRESH || "100d",
    algo: process.env.JWT_ALGO,
}

module.exports = jwtConfig;