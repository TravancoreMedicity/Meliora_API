const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { totaladmissioncount, getDamacount } = require('../WeworkDashboard/Wework.controller')


router.get('/admission/count', checkToken, totaladmissioncount)
router.get('/damacount:id', checkToken, getDamacount)

module.exports = router;