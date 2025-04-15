const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getCategoryDetails, getCategoryDetailsSpare, getCountCategory, getCountCategorySpare, getAssetCount, getSpareCount,
    getAssetValue, getSpareValue, getTotAssetValue, getTotspareValue, getTotAssetCount, getTotSpareCount, getTotalCountCategory,
    getTotalCountCategorySpare, getTotalCountItemType, getTotalCountAssetType, getAllAmcCmcUnderCustodian, getExpiredAmcCmc,
    getActveWarrentyGaurentee, getExpiredWarGaur } = require('./am_dashboard.controller')


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
router.post("/getTotalCountCategorySpare", checkToken, getTotalCountCategorySpare)
router.get('/getTotalCountItemType', checkToken, getTotalCountItemType)
router.get('/getTotalCountAssetType', checkToken, getTotalCountAssetType)
router.post("/getAllAmcCmcUnderCustodian", checkToken, getAllAmcCmcUnderCustodian);
router.post("/getExpiredAmcCmc", checkToken, getExpiredAmcCmc);
router.post("/getActveitemsWarrentyGaurentee", checkToken, getActveWarrentyGaurentee);
router.post("/getExpiredWarGaur", checkToken, getExpiredWarGaur);


module.exports = router;