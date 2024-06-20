
const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { IncidetDetailInsert, IncidentDetailsUpdate, UpdateMarkedIncidentDetails, SearchIncidentDetails,
    IncidentApprovalChecks, InpatientIncidetDetailInsert, InpatientIncidetDetailsUpdate
} = require('./incident.controller');
router.post('/incidentsave', checkToken, IncidetDetailInsert);
router.patch('/incidentUpdate', checkToken, IncidentDetailsUpdate);
router.patch('/markIncident', checkToken, UpdateMarkedIncidentDetails);
router.post('/search', checkToken, SearchIncidentDetails);
router.post('/apprvcheck', checkToken, IncidentApprovalChecks);
// ipendoscopy
router.post('/ipIncidentSave', checkToken, InpatientIncidetDetailInsert);
router.patch('/ipincidentUpdate', checkToken, InpatientIncidetDetailsUpdate);
module.exports = router;