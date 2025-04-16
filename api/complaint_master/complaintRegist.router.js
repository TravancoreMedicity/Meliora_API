const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { complaintRegistInsert, complaintRegistUpdate, getcomplaintRegistByID,
    getcomplaintListbylogin, getcomplaintListbydept, insertAssetArray, assetinactive,
    getcomplaintAll, getapptokenbydept, getAssetinComplaint, UpdateAssetinComplaint, getRoomsNameNdTypeList, getAssetsInRoom, getDeptSecWiseTicket,
    SpareDetailsUndercomplaint, viewAllPendingTicket, deleteTicket,getVerificationPending
} = require('../complaint_master/complaintRegist.controller');

router.post("/", checkToken, complaintRegistInsert);
router.patch("/", checkToken, complaintRegistUpdate);
router.post("/byid", checkToken, getcomplaintRegistByID);
router.get('/loginbysec/:id', checkToken, getcomplaintListbylogin);
router.get('/compltbydept/:id', checkToken, getcomplaintListbydept);
router.get("/compalint/all", checkToken, getcomplaintAll);
router.get('/getapptoken/:id', checkToken, getapptokenbydept);
router.get('/getAssetinComplaint/:id', checkToken, getAssetinComplaint)
router.patch('/UpdateAssetinComplaint', checkToken, UpdateAssetinComplaint);
router.get('/getAssetsInRoom/:id', checkToken, getAssetsInRoom)
router.post('/insertAssetArray', checkToken, insertAssetArray)
router.patch('/assetinactive', checkToken, assetinactive)
router.get('/getDeptSecWiseTicket/:id', checkToken, getDeptSecWiseTicket);
router.get("/SpareDetailsUndercomplaint/:id", checkToken, SpareDetailsUndercomplaint)
router.get('/viewAllPendingTicket', checkToken, viewAllPendingTicket)
router.get('/getRoomsNameNdTypeList/:id', checkToken, getRoomsNameNdTypeList)
router.delete("/deleteTicket/:id", checkToken, deleteTicket)


router.get("/getVerificationPending/:id",checkToken,  getVerificationPending);



console.log("vvvv");



module.exports = router;



