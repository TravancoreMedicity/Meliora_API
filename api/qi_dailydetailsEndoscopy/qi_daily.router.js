const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");

const { EndoscopyQiInsert, getPatientList, EndoDetailsAlreadyInsert, EndoscopyQiUpdate, getEndoscopyPatientList } = require('./qi_daily.controller');
router.post('/save', checkToken, EndoscopyQiInsert);
router.post('/exist', checkToken, EndoDetailsAlreadyInsert);
router.post('/viewList', checkToken, getPatientList);
router.patch('/update', checkToken, EndoscopyQiUpdate);
router.post('/view', checkToken, getEndoscopyPatientList);
// router.get('/getqi/:id', checkToken, getQualityInicatorList);
// router.post('/endoReport', checkToken, getQIReportEndoscopy);

module.exports = router;