const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { CommunicationDeviceInsert, CommunicationDeviceView, CommunicationDeviceUpdate } = require('../it_communication_device_details/communication.controller');

router.post('/insert', checkToken, CommunicationDeviceInsert)
router.get('/view', checkToken, CommunicationDeviceView)
router.patch('/update', checkToken, CommunicationDeviceUpdate)
module.exports = router