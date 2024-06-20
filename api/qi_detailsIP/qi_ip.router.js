const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");

const { InsertIPPatients } = require('./qi_ip.controller')
router.post('/save', checkToken, InsertIPPatients);
module.exports = router;