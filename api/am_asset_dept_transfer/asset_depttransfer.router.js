const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getAssetBasedOnLocation, transferDepartment, getTransferHistory, getAssetLocationDetails, AssetTransfer, getArrayOfAssetLocationDetails,
    getcustodianTransferhistory, getTransferDetail, getAssetOnSection
} = require('../am_asset_dept_transfer/asset_depttransfer.controller');


router.post("/getAssetBasedOnLocation", checkToken, getAssetBasedOnLocation)
router.patch("/transferDepartment", checkToken, transferDepartment)
router.post("/getAssetTransferHistory", checkToken, getTransferHistory)
router.post("/getAssetLocationDetails", checkToken, getAssetLocationDetails)
router.patch("/AssetTransfer", checkToken, AssetTransfer)

// router.patch("/CustodianAssetTransfer", checkToken, CustodianAssetTransfer)

router.post("/getArrayOfAssetLocationDetails", checkToken, getArrayOfAssetLocationDetails)


router.post("/getcustodianTransferhistory", checkToken, getcustodianTransferhistory);
router.post("/getTransferDetail", checkToken, getTransferDetail);

router.post("/getAssetOnSection", checkToken, getAssetOnSection)

module.exports = router;