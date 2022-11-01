const jwt = require("jsonwebtoken");
module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            // Remove Bearer from string
            token = token.slice(7);
            jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
                if (err) {

                    return res.json({
                        status: 102,
                        message: "Invalid Token"
                    });
                } else {
                    req.decoded = decoded;
                    // return res.json({
                    //   status: 100,
                    //   message: "valid token"
                    // });
                    next();
                }
            });
        } else {
            return res.json({
                success: 101,
                message: "Invalid Token"
            });
        }
    }
};