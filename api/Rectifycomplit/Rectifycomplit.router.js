const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getRectifycomplt, Updatecomplit, UpdateVerify, getAssignEmps,
    getlocationbsedAsset, AssetMappComplaint, AssetDetailsGet
} = require('../Rectifycomplit/Rectifycomplit.controller')

router.get('/getRectifycomplit/:id', checkToken, getRectifycomplt)
router.patch('/updatecmp', checkToken, Updatecomplit)//Complaint master update
router.patch('/update/verify', checkToken, UpdateVerify)
router.get('/getAssignEmps/:id', checkToken, getAssignEmps)

router.get('/getlocationbsedAsset/:id', checkToken, getlocationbsedAsset)
router.post("/AssetMappComplaint", checkToken, AssetMappComplaint);
router.get('/AssetDetailsGet/:id', checkToken, AssetDetailsGet)
module.exports = router;