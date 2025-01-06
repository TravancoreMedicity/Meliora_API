const jwt = require("jsonwebtoken");
module.exports = {
    validateToken: (req, res) => {
        let token = req.get("authorization");

        if (token) {
            // Remove Bearer from string
            token = token.slice(7);
            jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
                if (err) {

                    return res.json({
                        success: 100,
                        message: "Invalid Token"
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        }
    },
    validateTokenFrontend: (req, res) => {
        let token = req.get("authorization");

        if (token) {
            // Remove Bearer from string
            token = token.slice(7);
            jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
                if (err) {

                    return res.json({
                        success: 101,
                        message: "Invalid Token"
                    });
                } else {
                    return res.json({
                        success: 106,
                        message: "valid Token"
                    });
                }
            });
        }
    },
};
