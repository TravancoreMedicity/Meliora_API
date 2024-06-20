const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");

const { EndoscopyQiInsert, getPatientList, EndoscopyPatientUpdate, getEndoscopyMonthlyView,
    EndoscopyQiUpdate, getLastUpdatedDate, UpdateLastImportedDate, InchargeApprovalSave,
    searchPatients, getIncidentDetailsForEndoscopy, AseessmentExceededList, InchargeApprvlView,
    getEmployeeList, IPEndoscopyInsert, ViewIpPatientsView, IPEndoscopyQIUpdate, getIPIncidentForEndoscopy,
    getInpatientEndoscopyMonthlyView, EquipmentDetailsInsert, OPequipmentDetailExist, OPdeleteEquipment,
    IPequipmentDetailExist, IPdeleteEquipment, getTotalTestPerformed, IPAseessExceededList, HODApprovalSave,
    HODApprovalUpdate } = require('./qi_daily.controller');
router.post('/save', checkToken, EndoscopyQiInsert);
// date view
router.post('/viewList', checkToken, getPatientList);
router.patch('/update', checkToken, EndoscopyPatientUpdate);
router.post('/getIncident', checkToken, getIncidentDetailsForEndoscopy);
// for monthly Report
router.post('/view', checkToken, getEndoscopyMonthlyView);
router.patch('/qiupdate', checkToken, EndoscopyQiUpdate);
router.get('/getlast/:id', checkToken, getLastUpdatedDate);
router.patch('/dateupdate', checkToken, UpdateLastImportedDate);
router.post('/searchbyPatient', checkToken, searchPatients);
router.post('/viewAssess', checkToken, AseessmentExceededList);
router.post('/inchrgeapprv', checkToken, InchargeApprovalSave);
router.post('/apprvView', checkToken, InchargeApprvlView);
router.get('/empList/:id', checkToken, getEmployeeList);
router.post('/hodapprv', checkToken, HODApprovalSave);
router.patch('/hodapprvUpdate', checkToken, HODApprovalUpdate);
// ip endoscopy
router.post('/saveIp', checkToken, IPEndoscopyInsert);
router.get('/viewIPList', checkToken, ViewIpPatientsView);
router.patch('/ipendoUpdate', checkToken, IPEndoscopyQIUpdate);
router.post('/IPIncident', checkToken, getIPIncidentForEndoscopy);
router.post('/IPReportview', checkToken, getInpatientEndoscopyMonthlyView);
router.post('/IPviewAssess', checkToken, IPAseessExceededList);
// equipment Details
router.post('/saveEquip', checkToken, EquipmentDetailsInsert);
router.get('/equip/:id', checkToken, OPequipmentDetailExist);
router.delete('/delete/:id', checkToken, OPdeleteEquipment);
router.get('/ipequip/:id', checkToken, IPequipmentDetailExist);
router.delete('/ipdelete/:id', checkToken, IPdeleteEquipment);
router.post('/testCount', checkToken, getTotalTestPerformed);



module.exports = router;