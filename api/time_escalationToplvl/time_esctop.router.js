const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getEscalationTopLevel, getescalationcountIt, getescalationcountMain } = require('../time_escalationToplvl/time_esctop.controller')

router.post("/toplevel", checkToken, getEscalationTopLevel);

router.post("/toplevelcountit", checkToken, getescalationcountIt);
router.post("/toplevelcountmain", checkToken, getescalationcountMain);
module.exports = router;