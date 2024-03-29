const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { DeviceTypeInsert, DeviceTypeView, DeviceTypeUpdate } = require('../it_communication_device_type/device_type.controller');

router.post('/insert', checkToken, DeviceTypeInsert)
router.get('/view', checkToken, DeviceTypeView)
router.patch('/update', checkToken, DeviceTypeUpdate)
module.exports = router