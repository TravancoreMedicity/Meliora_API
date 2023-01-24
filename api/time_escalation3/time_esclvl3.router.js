const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getEscalationLevel3, getescalationcountIt, getescalationcountMain } = require('../time_escalation3/time_esclvl3.controller')

router.post("/level3", checkToken, getEscalationLevel3);
router.post("/level3countit", checkToken, getescalationcountIt);
router.post("/level3countmain", checkToken, getescalationcountMain);

module.exports = router;