const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getFoodDetails } = require("./gemini.controller");



router.post("/getfood", checkToken, getFoodDetails)

module.exports = router;