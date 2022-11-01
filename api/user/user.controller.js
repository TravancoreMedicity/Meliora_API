const jwt = require("jsonwebtoken");
module.exports = {
    validateToken: (req, res, next) => {
        let token = req.get("authorization");

        if (token) {
            // Remove Bearer from string
            token = token.slice(7);
            jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
                if (err) {
                    return res.json({
                        status: 100,
                        message: "Invalid Token"
                    });
                } else {
                    req.decoded = decoded;
                    return res.json({
                        status: 200,
                        message: "valid Token"
                    });
                    next();
                }
            });
        } else {
            return res.json({
                status: 101,
                message: "no token"
            });
        }
    }
};
