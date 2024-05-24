const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");

const { EndoscopyQiInsert, getPatientList, EndoscopyPatientUpdate, getEndoscopyMonthlyView,
    EndoscopyQiUpdate, getLastUpdatedDate, UpdateLastImportedDate,
    searchPatients, getIncidentDetailsForEndoscopy, AseessmentExceededList } = require('./qi_daily.controller');
router.post('/save', checkToken, EndoscopyQiInsert);
// date view
router.post('/viewList', checkToken, getPatientList);
router.patch('/update', checkToken, EndoscopyPatientUpdate);
// for monthly Report
router.post('/view', checkToken, getEndoscopyMonthlyView);
router.patch('/qiupdate', checkToken, EndoscopyQiUpdate);
router.get('/getlast/:id', checkToken, getLastUpdatedDate);
router.patch('/dateupdate', checkToken, UpdateLastImportedDate);
router.post('/searchbyPatient', checkToken, searchPatients);
router.post('/getIncident', checkToken, getIncidentDetailsForEndoscopy);
router.post('/viewAssess', checkToken, AseessmentExceededList);
module.exports = router;