const router = require("express").Router();
const { CommunicationDeviceInsert, CommunicationDeviceView, CommunicationDeviceUpdate } = require('../it_communication_device_details/communication.controller');

router.post('/insert', CommunicationDeviceInsert)
router.get('/view', CommunicationDeviceView)
router.patch('/update', CommunicationDeviceUpdate)
module.exports = router