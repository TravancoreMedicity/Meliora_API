const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getCategoryDetails, getCategoryDetailsSpare, getCountCategory, getCountCategorySpare, getAssetCount, getSpareCount,
    getAssetValue, getSpareValue, getTotAssetValue, getTotspareValue, getTotAssetCount, getTotSpareCount, getTotalCountCategory,
    getTotalCountCategorySpare, getTotalCountItemType, getTotalCountItemTypeSpare, getTotalCountAssetType, getTotalCountAssetSpareType } = require('./am_dashboard.controller')


router.post("/getCategoryDetails", checkToken, getCategoryDetails);
router.post("/getCategoryDetailsSpare", checkToken, getCategoryDetailsSpare);

router.post("/getCountCategory", checkToken, getCountCategory);
router.post("/getCountCategorySpare", checkToken, getCountCategorySpare);

router.post("/getAssetCount", checkToken, getAssetCount);
router.post("/getSpareCount", checkToken, getSpareCount);

router.post("/getAssetValue", checkToken, getAssetValue);
router.post("/getSpareValue", checkToken, getSpareValue);


router.get('/getTotAssetValue', checkToken, getTotAssetValue)
router.get('/getTotspareValue', checkToken, getTotspareValue)

router.get('/getTotAssetCount', checkToken, getTotAssetCount)
router.get('/getTotSpareCount', checkToken, getTotSpareCount)

router.post("/getTotalCountCategory", checkToken, getTotalCountCategory);
router.post("/getTotalCountCategorySpare", checkToken, getTotalCountCategorySpare);

// router.post("/getTotalCountItemType", checkToken, getTotalCountItemType);
router.get('/getTotalCountItemType', checkToken, getTotalCountItemType)
// router.post("/getTotalCountItemTypeSpare", checkToken, getTotalCountItemTypeSpare);

router.get('/getTotalCountAssetType', checkToken, getTotalCountAssetType)
// router.post("/getTotalCountAssetType", checkToken, getTotalCountAssetType);
// router.post("/getTotalCountAssetSpareType", checkToken, getTotalCountAssetSpareType);

module.exports = router;