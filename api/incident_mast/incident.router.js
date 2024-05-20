
const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { IncidetDetailInsert, IncidentDetailsUpdate, UpdateMarkedIncidentDetails,
    SearchIncidentDetails } = require('./incident.controller');
router.post('/incidentsave', checkToken, IncidetDetailInsert);
router.patch('/incidentUpdate', checkToken, IncidentDetailsUpdate);
router.patch('/markIncident', checkToken, UpdateMarkedIncidentDetails);
router.post('/search', checkToken, SearchIncidentDetails);
module.exports = router;