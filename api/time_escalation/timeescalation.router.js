const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getEscalationComplaint, getEscalationLevels, getEscalationLevel1It, getEscalationLevel1Maintenance,
    getEscalationSelectbox, escmappingByid, getescmappingByidcount, getescalationcountMaintenance, getescalationcountIt } = require('../time_escalation/timeescalation.controller')

router.get("/", checkToken, getEscalationComplaint);
router.get("/levels", checkToken, getEscalationLevels);

router.post("/level1It", checkToken, getEscalationLevel1It);

router.get("/level1Main", checkToken, getEscalationLevel1Maintenance);
router.get("/levelselect", checkToken, getEscalationSelectbox);
router.get("/byid/:id", checkToken, escmappingByid);

router.get("/count", checkToken, getescmappingByidcount);


router.post("/count", checkToken, getescalationcountMaintenance);

router.post("/countIt", checkToken, getescalationcountIt);
module.exports = router;