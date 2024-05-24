const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { EmergencyQiInsert, getPatientList, EmergencyQiUpdate, searchPatients, AseessmentExceededList } = require('./qi_emergency.controller');

router.post('/insertData', checkToken, EmergencyQiInsert);
router.post('/viewList', checkToken, getPatientList);
router.patch('/qiupdate', checkToken, EmergencyQiUpdate);
router.post('/searchbyPatient', checkToken, searchPatients);
router.post('/viewAssess', checkToken, AseessmentExceededList);

module.exports = router;
