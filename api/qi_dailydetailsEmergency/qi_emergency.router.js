const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");

const {
    EmergencyQiInsert,
    EmergencyAlreadyExist,
    EmergencyQiUpdate,
    getQIReportEmergency,
    getMonthlyReportEmergency
} = require('./qi_emergency.controller');

router.post('/savedata', checkToken, EmergencyQiInsert);
router.post('/exist', checkToken, EmergencyAlreadyExist);
router.patch('/update', checkToken, EmergencyQiUpdate);
router.post('/emerReport', checkToken, getQIReportEmergency);
router.post('/monthlyReport', checkToken, getMonthlyReportEmergency);

module.exports = router;