const router = require("express").Router();

const { getCategory, getGroup, getAssetType, getAmItemType, getAmSubcategory, getAmSubGroup, getAmManufacture, getAmModel, getUOM, getSubmodel } = require('../am_selectcomponents/select.controller');
router.get('/categoryDropdown', getCategory)
router.get('/groupDropdown', getGroup)
router.get('/AssetTypeDropdown', getAssetType)
router.get('/ItemTypeDropdown', getAmItemType)
router.get('/subcategoryDropdown/:id', getAmSubcategory)
router.get('/subGroupDropdown/:id', getAmSubGroup)
router.get('/submodelDropdown/:id', getSubmodel)
router.get('/manufatureDropdown', getAmManufacture)
router.get('/modelDropDown', getAmModel)
router.get('/uomDropDown', getUOM)

module.exports = router;