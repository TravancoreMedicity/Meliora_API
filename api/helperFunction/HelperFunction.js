// @ts-nocheck
require("dotenv").config();
const jwt = require("jsonwebtoken");
const logger = require("../../logger/logger");

// const generateAccessToken = (userData) => {
//     const plainUserData = JSON.parse(JSON.stringify(userData));    
//     return jwt.sign(plainUserData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
// }

const generateAccessToken = (userData) => {
    return jwt.sign({ id: userData }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "30m",
    });
};

const generateRefreshToken = ({ userSlno }) =>
    jwt.sign({ id: userSlno }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1d",
    });

module.exports = { generateAccessToken, generateRefreshToken };
