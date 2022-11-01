const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getdietReport, getNurStatnReport, getPatientReport, getPatientReportExtra, getPatientMonthly,
    getPatientMonthlyExtra } = require("../diet_report/diet_report.controller");


router.post('/getdietReport', checkToken, getdietReport);
router.post('/getNurseStatntReport', checkToken, getNurStatnReport);
router.post('/getPatientReport', checkToken, getPatientReport);
router.post('/getPatientReport/ExtraOrder', checkToken, getPatientReportExtra);
router.post('/getPatientReport/Monthly', checkToken, getPatientMonthly);
router.post('/getPatientReport/Monthly/Extra', checkToken, getPatientMonthlyExtra);
module.exports = router;