const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getDeviceType, getDeviceTypePassword, getPasswordCredential, getSimType, getBillType, getBillCategory, getSupplierList,
    getSupplierData
} = require('../it_select_components/devicetypeSelect.controller');

router.get('/communicationDeviceDropDown', checkToken, getDeviceType)
router.get('/passwordDeviceDropDown', checkToken, getDeviceTypePassword)
router.get('/passwordCredential', checkToken, getPasswordCredential)
router.get('/simType', checkToken, getSimType)
router.get('/itBilltype', checkToken, getBillType)
router.get('/itBillCategory', checkToken, getBillCategory)
router.get('/itBillSupplierList', checkToken, getSupplierList)

router.get('/getSupplierData/:id', checkToken, getSupplierData)


module.exports = router;