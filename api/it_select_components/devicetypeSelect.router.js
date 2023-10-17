const router = require("express").Router();

const { getDeviceType } = require('../it_select_components/devicetypeSelect.controller');
router.get('/communicationDeviceDropDown', getDeviceType)


module.exports = router;