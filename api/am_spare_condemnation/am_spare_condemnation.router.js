const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { CondemnationList, ServiceList, pmDueOverList, AssetServiceList, getAssetCondemnationList } = require('../am_spare_condemnation/am_spare_condemnation.controller')

router.get("/CondemnationList/:id", checkToken, CondemnationList)
router.get("/ServiceList/:id", checkToken, ServiceList)
router.get("/pmDueOverList/:id", checkToken, pmDueOverList)


router.get("/AssetServiceList/:id", checkToken, AssetServiceList)

router.get("/getAssetCondemnationList/:id", checkToken, getAssetCondemnationList)

module.exports = router