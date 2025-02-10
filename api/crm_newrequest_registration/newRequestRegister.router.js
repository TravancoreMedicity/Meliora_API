const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { requestRegistInsert, InHodExist, getAllReqBasedDept, getDetailItemList, UpdateReqMaster, getApprovListOthers,
    getAllReqBasedDeptreq, deleteItemDetails, getAllPendingApprovalsAboveHOD, getPoList, searchCrfDetails,
    getAllHoldAndRejectItems, getackPending, UpdateItemReceiveStatus, checkStoreReturnItem, insertReturnItemDetails,
    itemReturnDetailsForViewStore, returnReplyDetails, viewItemReturnDetails, getCrfDetailsForBiomedical
} = require('./newRequestRegister.controller');

router.post("/InsertRegMast", checkToken, requestRegistInsert);
router.patch("/deleteItemList", checkToken, deleteItemDetails);
router.patch("/UpdateReqMaster", checkToken, UpdateReqMaster);

// router.post("/postDetails", checkToken, requestRegistInsertDetl);
// router.post("/postReqApproval", checkToken, requestApprovalInsert);

router.get("/InHodExist/:id", checkToken, InHodExist)
router.post('/getAllReqBasedDept', checkToken, getAllReqBasedDept);
router.get("/getAllReqBasedDeptreq/:id", checkToken, getAllReqBasedDeptreq);
router.get("/getDetailItemList/:id", checkToken, getDetailItemList);
router.get("/getApprovList/others", checkToken, getApprovListOthers);

// HOLd, reject and closed radiobutton view
router.post("/getPendingList", checkToken, getAllPendingApprovalsAboveHOD);
router.post("/getHoldRejectItems", checkToken, getAllHoldAndRejectItems);
router.post("/getPOList", checkToken, getPoList);
router.post('/searchCrf', checkToken, searchCrfDetails);

// used inform user to user ack pending CRf
router.get("/ackPending/:id", checkToken, getackPending);

// Store Return Details
router.patch("/receiveReturn", checkToken, UpdateItemReceiveStatus);
router.get("/check/:id", checkToken, checkStoreReturnItem);
router.post('/returnDetails', checkToken, insertReturnItemDetails)
router.post('/returnPending', checkToken, itemReturnDetailsForViewStore)
router.post('/returnReply', checkToken, returnReplyDetails);
router.get("/returnView/:id", checkToken, viewItemReturnDetails);

router.post("/biomedicalView", checkToken, getCrfDetailsForBiomedical);


module.exports = router;