const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { totalPatient, dietPlanned, dietPlanPending } = require("../diet_dashboard/diet_dashboard.controller");


router.get("/totalPatient", checkToken, totalPatient);
router.get("/dietPlanned", checkToken, dietPlanned);
router.get("/dietPlanPending", checkToken, dietPlanPending);


module.exports = router;