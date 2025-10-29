const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  checkToken: (req, res, next) => {
    const token = req.cookies.accessToken;
    const kmctoken = req.get("authorization");
    if (token) {
      // Remove Bearer from string
      //   token = token.slice(7);
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          //   logger.error(err);
          return res.status(401).json({
            status: 401,
            message: "Invalid Token 1",
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else if (kmctoken) {
      tokenkmc = kmctoken.slice(6);
      jwt.verify(tokenkmc, process.env.SECRET_ID_KMCMEL, (err, decoded) => {
        if (err) {
          //   logger.error(err);
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
      return res.status(401).json({
        status: 401,
        message: "Invalid Token 2",
      });
    }

    // let token = req.get("authorization");
    // if (token) {
    //     // Remove Bearer from string
    //     token = token.slice(7);
    //     jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    //         if (err) {

    //             return res.json({
    //                 status: 102,
    //                 message: "Invalid Token"
    //             });
    //         } else {
    //             req.decoded = decoded;
    //             // return res.json({
    //             //   status: 100,
    //             //   message: "valid token"
    //             // });
    //             next();
    //         }
    //     });
    // } else {
    //     return res.json({
    //         success: 101,
    //         message: "Invalid Token"
    //     });
    // }
  },
};
