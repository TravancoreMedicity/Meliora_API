const rateLimit = require('express-rate-limit');

const buildKey = (req) => {
    // 1 If decoded JWT token exists → Use user ID (best)
    if (req.decoded?.id) return `USER_${req.decoded.id}`;
    // 2 Fallback to safe IPv4/IPv6 generator
    const ip = req.connection?.remoteAddress || "UNKNOWN_IP";
    return ip;
};


// Normal limiter → 200 requests per 10 minutes PER USER
const normalRateLimiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 10 minute
    max: 200, // limit each IP to 30 requests per windowMs
    message: {
        status: 429,
        success: 4,
        message: "Too Many Request !.Please Wait...!"
    },
    keyGenerator: buildKey,
    standardHeaders: true,
    legacyHeaders: false,
});


// Strict limiter → 30 requests per 5 minutes PER USER
const strictRateLimiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 10 minute
    max: 100, // limit each IP to 30 requests per windowMs
    message: {
        status: 429,
        success: 4,
        message: "Too Many Request !.Please Wait...!"
    },
    keyGenerator: buildKey,
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = { normalRateLimiter, strictRateLimiter };