const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");

const {
    getVerificationDetails,
    getBackupEmployee,
    verificationUpdate,
    monthlyVerificationUpdate,
    yearlyVerificationUpdate,
    WeeklyVerificationUpdate,
    DaysVerificationUpdate } = require('./backupVerification.controller');

router.get('/select', checkToken, getVerificationDetails);
// router.get('/getemp', checkToken, getBackupEmployee);
router.patch('/update', checkToken, verificationUpdate);
router.patch('/updatemonth', checkToken, monthlyVerificationUpdate);
router.patch('/updateyear', checkToken, yearlyVerificationUpdate);
router.patch('/updateweek', checkToken, WeeklyVerificationUpdate);
router.patch('/updatedays', checkToken, DaysVerificationUpdate);

router.get("/getemp/:id", checkToken, getBackupEmployee)

module.exports = router;