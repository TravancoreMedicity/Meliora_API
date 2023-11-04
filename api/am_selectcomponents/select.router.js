const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getCategory, getGroup, getAssetType, getAmItemType, getAmSubcategory, getAmSubGroup, getAmManufacture,
    getAmModel, getUOM, getSubmodel, modelNoSelect, ItemBasedOnDeptSec, SpareItemBasedOnDeptSec
} = require('../am_selectcomponents/select.controller');
router.get('/categoryDropdown', checkToken, getCategory)
router.get('/groupDropdown', checkToken, getGroup)
router.get('/AssetTypeDropdown', checkToken, getAssetType)
router.get('/ItemTypeDropdown', checkToken, getAmItemType)
router.get('/subcategoryDropdown/:id', checkToken, getAmSubcategory)
router.get('/subGroupDropdown/:id', checkToken, getAmSubGroup)
router.get('/submodelDropdown/:id', checkToken, getSubmodel)
router.get('/manufatureDropdown', checkToken, getAmManufacture)
router.get('/modelDropDown', checkToken, getAmModel)
router.get('/uomDropDown', checkToken, getUOM)
router.get('/modelNoSelect', checkToken, modelNoSelect)
router.get('/ItemBasedOnDeptSec/:id', checkToken, ItemBasedOnDeptSec)
router.get('/SpareItemBasedOnDeptSec/:id', checkToken, SpareItemBasedOnDeptSec)

module.exports = router;