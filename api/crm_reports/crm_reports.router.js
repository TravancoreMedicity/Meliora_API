const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getCRFNoBased, getdataUserAcknldged
} = require('../crm_reports/crm_report.controller');

router.get("/getCRFNoBased/:id", checkToken, getCRFNoBased);
router.post('/getdataUserAcknldged', checkToken, getdataUserAcknldged);

module.exports = router;