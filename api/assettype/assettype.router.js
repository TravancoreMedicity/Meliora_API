const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { assetTypeInsert, assetTypeUpdate, getAssetType,
    deleteAssetType, getAssetTypeById, getAssetTypeStatus } = require('../assettype/assettype.controller');

router.post("/", checkToken, assetTypeInsert);
router.patch("/", checkToken, assetTypeUpdate);
router.get("/", checkToken, getAssetType);


router.get("/", checkToken, getAssetTypeById);

router.delete("/", checkToken, deleteAssetType);

router.get("/status", checkToken, getAssetTypeStatus);

module.exports = router;