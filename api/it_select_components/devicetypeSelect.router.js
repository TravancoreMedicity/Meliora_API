const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getDeviceType, getDeviceTypePassword, getPasswordCredential } = require('../it_select_components/devicetypeSelect.controller');
router.get('/communicationDeviceDropDown', checkToken, getDeviceType)
router.get('/passwordDeviceDropDown', checkToken, getDeviceTypePassword)
router.get('/passwordCredential', checkToken, getPasswordCredential)


module.exports = router;