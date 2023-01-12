const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getEscalationLevel2, getescalationcountMain, getescalationcountIt } = require('../time_escalation2/time_esclvl2.controller')

router.post("/level2", checkToken, getEscalationLevel2);
router.post("/level2countmain", checkToken, getescalationcountMain);
router.post("/level2countit", checkToken, getescalationcountIt);

module.exports = router;