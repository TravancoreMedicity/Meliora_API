const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { totaladmissioncount, getDamacount, getcountbhrc } = require('../WeworkDashboard/Wework.controller')


router.get('/admission/count', checkToken, totaladmissioncount)
router.get('/damacount/:id', checkToken, getDamacount)
router.get('/countbhrc', checkToken, getcountbhrc)
module.exports = router;