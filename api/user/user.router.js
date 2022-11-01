const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { validateToken } = require("../user/user.controller");
router.get('/', validateToken, (req, res) => {
    return res.json(req.complete);
});

module.exports = router;

