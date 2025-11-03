const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getAssetBasedOnLocation, transferDepartment, getTransferHistory, getAssetLocationDetails, AssetTransfer, getArrayOfAssetLocationDetails,
    getcustodianTransferhistory, getTransferDetail, getAssetOnSection,getAssetUnderCustodian,getSpareUnderCustodian,
    TransferAssetUnderCustodian,TransferSpareUnderCustodian
} = require('../am_asset_dept_transfer/asset_depttransfer.controller');


router.post("/getAssetBasedOnLocation", checkToken, getAssetBasedOnLocation)
router.patch("/transferDepartment", checkToken, transferDepartment)
router.post("/getAssetTransferHistory", checkToken, getTransferHistory)
router.post("/getAssetLocationDetails", checkToken, getAssetLocationDetails)
router.patch("/AssetTransfer", checkToken, AssetTransfer)
router.post("/getArrayOfAssetLocationDetails", checkToken, getArrayOfAssetLocationDetails)
router.post("/getcustodianTransferhistory", checkToken, getcustodianTransferhistory);
router.post("/getTransferDetail", checkToken, getTransferDetail)
router.post("/getAssetOnSection", checkToken, getAssetOnSection)
router.post("/getAssetUnderCustodian", checkToken, getAssetUnderCustodian)
router.post("/getSpareUnderCustodian", checkToken, getSpareUnderCustodian)

router.patch("/TransferAssetUnderCustodian", checkToken, TransferAssetUnderCustodian)
router.patch("/TransferSpareUnderCustodian", checkToken, TransferSpareUnderCustodian)


module.exports = router;