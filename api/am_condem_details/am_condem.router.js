const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { insertCondemMasterData, UpdateItemDetails, getItemDetails, getItemSlno, updateCondemMasterData, getpendingApprovals, getItemUnderForm, updateScarpStoreData,
    ApproveData
} = require('./am_condem.controller')


router.post('/insertCondemMasterData', checkToken, insertCondemMasterData)
router.patch('/UpdateItemDetails', checkToken, UpdateItemDetails)
router.post("/getItemDetails", checkToken, getItemDetails);
router.post("/getItemSlno", checkToken, getItemSlno);
router.patch('/updateCondemMasterData', checkToken, updateCondemMasterData)
router.post("/getpendingApprovals", checkToken, getpendingApprovals);
router.post("/getItemUnderForm", checkToken, getItemUnderForm);
router.patch('/updateScarpStoreData', checkToken, updateScarpStoreData)

router.patch('/ApproveData', checkToken, ApproveData)


module.exports = router