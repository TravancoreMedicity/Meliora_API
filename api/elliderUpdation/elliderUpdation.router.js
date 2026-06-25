const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { generateOTP, VerifyOTP } = require('./elliderUpdation.controller');


router.post("/OTPGenerate", checkToken, generateOTP);
router.post("/VerifyOTP", checkToken, VerifyOTP);

module.exports = router;