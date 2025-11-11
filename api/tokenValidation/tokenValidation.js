// @ts-nocheck
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const logger = require("../../logger/logger");
module.exports = {
  verifyToken: (req, res, next) => {
    // let token = req.get('authorization')
    // let token = req.headers["authorization"];
    const token = req.cookies.accessToken;

    if (token) {
      // Remove Bearer from string
      // token = token.slice(7);
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          // logger.error(err);
          return res.status(401).json({
            status: 401,
            message: "Invalid Token 1",
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      // logger.error("No token");
      return res.status(401).json({
        status: 401,
        message: "Invalid Token 2",
      });
    }
  },

  validateAccessToken: (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) {
      return res
        .status(401)
        .json({ isValidToken: false, message: "No token provided" });
    }
    if (token) {
      // token = token.slice(7);
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res
            .status(401)
            .json({ isValidToken: false, message: "Invalid token" });
        }
        res.status(200).json({ isValidToken: true, message: "Token is valid" });
      });
    }
  },
};
