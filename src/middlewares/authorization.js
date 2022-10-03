/** @format */
const jwt = require("jsonwebtoken");
const RequestError = require("../helpers/requestError");

module.exports = {
  auth: (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
      throw RequestError(401, "Please , provide Header: 'Authorization' ");
    }

    const [type, token] = authorization.split(" ");

    if (!token) {
      throw RequestError(401, "Please , provide a token");
    }

    if (type !== "Bearer") {
      throw RequestError(401, "Token type not 'Bearer' ");
    }

    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      console.log("<<authorized OK!>>");
      next();
    } catch {
      next(res.RequestError(401));
    }
  },
};
