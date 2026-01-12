const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getCRFDatas } = require('./workOrder.controller');

router.get('/getCRFDatas', checkToken, getCRFDatas)
module.exports = router