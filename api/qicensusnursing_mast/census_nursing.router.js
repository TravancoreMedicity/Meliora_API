const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { censusNursingStatInsert, censusNursingStationView, NursingStationUpdate, getNursingStationActive } = require('./census_nursing.controller');
router.post('/insert', checkToken, censusNursingStatInsert);
router.get('/select', checkToken, censusNursingStationView);
router.patch('/update', checkToken, NursingStationUpdate);
router.get('/active', checkToken, getNursingStationActive);

module.exports = router;