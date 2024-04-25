const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { CommunicationDeviceInsert, CommunicationDeviceView, CommunicationDeviceUpdate,
    SimMastInsert, SimMastView, SimMastUpdate } = require('../it_communication_device_details/communication.controller');

router.post('/insert', checkToken, CommunicationDeviceInsert)
router.get('/view', checkToken, CommunicationDeviceView)
router.patch('/update', checkToken, CommunicationDeviceUpdate)

router.post('/siminsert', checkToken, SimMastInsert)
router.get('/simDetailView', checkToken, SimMastView)
router.patch('/simUpdate', checkToken, SimMastUpdate)






module.exports = router