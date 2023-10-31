const router = require("express").Router();
const { DeviceTypeInsert, DeviceTypeView, DeviceTypeUpdate } = require('../it_communication_device_type/device_type.controller');

router.post('/insert', DeviceTypeInsert)
router.get('/view', DeviceTypeView)
router.patch('/update', DeviceTypeUpdate)
module.exports = router