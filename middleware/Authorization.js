const jwt = require("jsonwebtoken");
const SendResponse = require("../helpers/SendResponse");

const Authenticated = (req, res, next) => {
  try {
    const authToken = req.headers["authorization"];
    const token = authToken && authToken.split(" ")[1];

    if (!token) {
      return res.status(401).send(SendResponse(401, "Unauthorized", null, null));
    }

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    res.locals.roleId = decoded.roleId;
    res.locals.id = decoded.id;

    next();
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};

const AuthorizeAdminRole = (_, res, next) => {
  try {
    if (res.locals.roleId !== 1) {
      return res.status(403).json({ message: "Forbidden: User not authorized" });
    }

    return next();
  } catch (error) {
    return res.status(500).send(ResponseData(500, "Internal Server Error", error, null));
  }
};

const AuthorizeEmployeeRole = (_, res, next) => {
  try {
    if (res.locals.roleId !== 2) {
      return res.status(403).json({ message: "Forbidden: User not authorized" });
    }

    return next();
  } catch (error) {
    return res.status(500).send(ResponseData(500, "Internal Server Error", error, null));
  }
};

module.exports = { Authenticated, AuthorizeAdminRole, AuthorizeEmployeeRole };
