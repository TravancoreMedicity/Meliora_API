const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { totaladmissioncount } = require('../WeworkDashboard/Wework.controller')


router.get('/admission/count', checkToken, totaladmissioncount)


module.exports = router;