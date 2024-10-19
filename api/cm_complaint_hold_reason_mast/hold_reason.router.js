const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { complaintHoldInsert, holdReasonget, complaintHoldUpdate } = require('./hold_reason.controller');

router.post("/holdInsert", checkToken, complaintHoldInsert);

router.get('/gethold', checkToken, holdReasonget);

router.patch('/updateHold', checkToken, complaintHoldUpdate)


module.exports = router