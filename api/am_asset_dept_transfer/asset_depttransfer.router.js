const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getAssetBasedOnLocation, transferDepartment } = require('../am_asset_dept_transfer/asset_depttransfer.controller');


router.post("/getAssetBasedOnLocation", checkToken, getAssetBasedOnLocation)

router.patch("/transferDepartment", checkToken, transferDepartment)
module.exports = router;