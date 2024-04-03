
const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");

const { e } = require('./incident.controller');

// router.patch('/update', checkToken, EndoscopyPatientUpdate);
// router.post('/view', checkToken, getEndoscopyPatientList);
// router.get('/getlast/:id', checkToken, getLastUpdatedDate);


module.exports = router;