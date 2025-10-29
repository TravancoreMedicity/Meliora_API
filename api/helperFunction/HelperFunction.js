// @ts-nocheck
require("dotenv").config();
const jwt = require("jsonwebtoken");
const logger = require("../../logger/logger");

const generateAccessToken = (userData) => {
  // const plainUserData = JSON.parse(JSON.stringify(userData));
  return jwt.sign({ id: userData }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });
};

const generateRefreshToken = ({ userSlno }) =>
  jwt.sign({ id: userSlno }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });

const generateEliderID = ({ userSlno }) =>
  jwt.sign({ id: userSlno }, process.env.SECRET_ID_MEL,
  );


const generateEliderToken = (userData) => {
  // const plainUserData = JSON.parse(JSON.stringify(userData));
  return jwt.sign({ id: userData }, process.env.SECRET_KEY_MEL, {
    expiresIn: "60d",
  });
};

const generateKmcToken = (userSlno) => {
  // const plainUserData = JSON.parse(JSON.stringify(userData));
  return jwt.sign({ id: userSlno }, process.env.SECRET_ID_KMCMEL, {
    expiresIn: "60d",
  });
};

module.exports = { generateAccessToken, generateRefreshToken, generateEliderToken, generateEliderID, generateKmcToken };
