const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { DeviceTypeInsert, DeviceTypeView, DeviceTypeUpdate } = require('../it_password_device_type/password_devicetype.controller');

router.post('/insert', checkToken, DeviceTypeInsert)
router.get('/view', checkToken, DeviceTypeView)
router.patch('/update', checkToken, DeviceTypeUpdate)
module.exports = router