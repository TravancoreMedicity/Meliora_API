const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { totaladmissioncount, getDamacount, getcountbhrc, getdocVisitCount, getDischargecountAfterNoon } = require('../WeworkDashboard/Wework.controller')


router.get('/admission/count', checkToken, totaladmissioncount)
router.get('/count', checkToken, getDamacount)
router.get('/countbhrc', checkToken, getcountbhrc)
router.get('/visitcount', checkToken, getdocVisitCount)
router.get('/DischargeCount', checkToken, getDischargecountAfterNoon)

module.exports = router;