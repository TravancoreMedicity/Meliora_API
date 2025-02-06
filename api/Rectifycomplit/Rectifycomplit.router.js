const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getRectifycomplt, Updatecomplit, UpdateVerify, getAssignEmps,
    getlocationbsedAsset, AssetMappComplaint, AssetDetailsGet, updateHoldProgress, getEmplHoldList, getEmplRectfiedList, getEmplVerifiedList, getUserEndRectfiedList,
    getUserEndVerifiedList, getDepartmentPendingList, getDepartmentRectfiedList, getDepartmentVerifiedList, getAuthorization, getAssetUnderSelectedCompltDept
} = require('../Rectifycomplit/Rectifycomplit.controller')

router.get('/getRectifycomplit/:id', checkToken, getRectifycomplt)
router.patch('/updatecmp', checkToken, Updatecomplit)//Complaint master update
router.patch('/update/verify', checkToken, UpdateVerify)
router.get('/getAssignEmps/:id', checkToken, getAssignEmps)

router.get('/getlocationbsedAsset/:id', checkToken, getlocationbsedAsset)
router.post("/AssetMappComplaint", checkToken, AssetMappComplaint);
router.get('/AssetDetailsGet/:id', checkToken, AssetDetailsGet)

router.patch("/updateHoldProgress", checkToken, updateHoldProgress);

router.post("/getEmplHoldList", checkToken, getEmplHoldList);
router.post("/getEmplRectfiedList", checkToken, getEmplRectfiedList);
router.post("/getEmplVerifiedList", checkToken, getEmplVerifiedList);

router.post("/getUserEndRectfiedList", checkToken, getUserEndRectfiedList);
router.post("/getUserEndVerifiedList", checkToken, getUserEndVerifiedList);

router.post("/getDepartmentPendingList", checkToken, getDepartmentPendingList);
router.post("/getDepartmentRectfiedList", checkToken, getDepartmentRectfiedList);
router.post("/getDepartmentVerifiedList", checkToken, getDepartmentVerifiedList);

router.get('/getAuthorization/:id', checkToken, getAuthorization)

router.post("/getAssetUnderSelectedCompltDept", checkToken, getAssetUnderSelectedCompltDept);




module.exports = router;