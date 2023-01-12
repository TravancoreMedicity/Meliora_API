const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getEscalationLevel4, getescalationcountIt, getescalationcountMain } = require('../time_escalation4/time_esclvl4.controller')

router.post("/level4", checkToken, getEscalationLevel4);
router.post("/level4countit", checkToken, getescalationcountIt);
router.post("/level4countmain", checkToken, getescalationcountMain);

module.exports = router;