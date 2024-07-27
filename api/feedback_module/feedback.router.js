const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getfeedbackNursingStations } = require('./feedback.controller');
router.get('/viewns', checkToken, getfeedbackNursingStations);


module.exports = router;