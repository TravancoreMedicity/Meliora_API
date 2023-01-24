const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { EscalationTimeInsert, getEscalation, EscalationUpdate } = require('../co_escalationtimemast/escalationtime.controller')

router.post("/", checkToken, EscalationTimeInsert);
router.patch("/", checkToken, EscalationUpdate);
router.get("/", checkToken, getEscalation);
module.exports = router;