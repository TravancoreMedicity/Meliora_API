const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { DialysisQiInsert, getPatientList, EmergencyQiUpdate } = require('./qi_dialysis.controller');

router.post('/insertData', checkToken, DialysisQiInsert);
router.post('/viewList', checkToken, getPatientList);
router.patch('/qiupdate', checkToken, EmergencyQiUpdate);

module.exports = router;