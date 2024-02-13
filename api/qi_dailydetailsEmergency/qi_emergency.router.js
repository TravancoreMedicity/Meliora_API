const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");

const {
    EmergencyQiInsert,
    EmergencyAlreadyExist
} = require('./qi_emergency.controller');

router.post('/savedata', checkToken, EmergencyQiInsert);
router.get('/exist/:id', checkToken, EmergencyAlreadyExist);


module.exports = router;