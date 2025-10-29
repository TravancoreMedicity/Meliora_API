const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { CategoryInsert, CategoryView, CategoryUpdate,ScrapYardInsert,ScrapYardView,ScrapYardUpdate,QualityInsert,QualityView,QualityUpdate,QuantityUnitInsert,QuantityUnitView,
    QuantityUnitUpdate,SupplierRateInsert,SupplierRateView,SupplierRateUpdate,getActiveCategory,getActiveQuality,getActiveQuantity,getSelectedSupplierRates,getActiveScarpLocation,
    scraplevelInsert,getScraplevels,getScraplevelUpdate,getScrapActivelevels,getEmployeeScrapLevel,getScrapActiveToplevel,getscrapItemRateDetail,
RemoveItemFromCategorized,RemoveAddedItemFromCategorized} = require('./condem_master.controller');

router.post('/CategoryInsert', checkToken, CategoryInsert)
router.get('/categoryView', checkToken, CategoryView)
router.patch('/categoryUpdate', checkToken, CategoryUpdate)
router.post('/ScrapYardInsert', checkToken, ScrapYardInsert)
router.get('/ScrapYardView', checkToken, ScrapYardView)
router.patch('/ScrapYardUpdate', checkToken, ScrapYardUpdate)
router.post('/QualityInsert', checkToken, QualityInsert)  
router.get('/QualityView', checkToken, QualityView)
router.patch('/QualityUpdate', checkToken, QualityUpdate)
router.post('/QuantityUnitInsert', checkToken, QuantityUnitInsert)
router.get('/QuantityUnitView', checkToken, QuantityUnitView)
router.patch('/QuantityUnitUpdate', checkToken, QuantityUnitUpdate)
router.post('/SupplierRateInsert', checkToken, SupplierRateInsert)
router.get('/SupplierRateView', checkToken, SupplierRateView)
router.patch('/SupplierRateUpdate', checkToken, SupplierRateUpdate)

//Select Code
router.get('/getActiveCategory', checkToken, getActiveCategory)
router.get('/getActiveQuality', checkToken, getActiveQuality)
router.get('/getActiveQuantity', checkToken, getActiveQuantity)
router.get('/getActiveScarpLocation', checkToken, getActiveScarpLocation)
router.get("/getSelectedSupplierRates/:id", checkToken, getSelectedSupplierRates)
router.post('/scraplevelInsert', checkToken, scraplevelInsert)
router.get('/getScraplevels', checkToken, getScraplevels)
router.patch('/scraplevelUpdate', checkToken, getScraplevelUpdate)
router.get('/getScrapActivelevels', checkToken, getScrapActivelevels)
router.get("/getEmployeeScrapLevel/:id", checkToken, getEmployeeScrapLevel)
router.get('/getScrapActiveToplevel', checkToken, getScrapActiveToplevel)
router.post("/getscrapItemRateDetail", checkToken, getscrapItemRateDetail);

router.patch('/RemoveItemFromCategorized', checkToken, RemoveItemFromCategorized)
router.patch('/RemoveItemsAddedFromCategorized', checkToken, RemoveAddedItemFromCategorized)


module.exports = router