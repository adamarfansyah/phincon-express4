const jwt = require("jsonwebtoken");

const GenerateToken = (data) => {
  const accessToken = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

module.exports = { GenerateToken };
