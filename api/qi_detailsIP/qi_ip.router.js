const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");

const { InsertIPPatients, getPatientList, searchPatientsbyName, UpdateDischargeDateOfPatients }
    = require('./qi_ip.controller')
router.post('/save', checkToken, InsertIPPatients);
router.post('/view', checkToken, getPatientList);
router.post('/searchbyPatient', checkToken, searchPatientsbyName);
router.patch('/dischargeDate', checkToken, UpdateDischargeDateOfPatients);
module.exports = router;