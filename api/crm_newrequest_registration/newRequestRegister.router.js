const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { requestRegistInsert, requestRegistInsertDetl, requestApprovalInsert, InHodExist, getAllReqBasedDept,
    getDetailItemList, EditItemListByReqno, UpdateReqMaster, getApprovListOthers, getpoApproovalDetails,
    getAllListDashboard, getAllReqBasedDeptreq, deleteItemDetails, getCRFPurchaseDashboard, getDeliveryMarkingDetails,
    getAllPoDetails, getAllItemDetails, getStoreAckDetails, getUserAckDetails, getCompletedCRF
} = require('../crm_newrequest_registration/newRequestRegister.controller');

router.post("/InsertRegMast", checkToken, requestRegistInsert);
router.post("/postDetails", checkToken, requestRegistInsertDetl);
router.post("/postReqApproval", checkToken, requestApprovalInsert);


router.get("/InHodExist/:id", checkToken, InHodExist)
router.post('/getAllReqBasedDept', checkToken, getAllReqBasedDept);
router.get("/getAllReqBasedDeptreq/:id", checkToken, getAllReqBasedDeptreq);
router.get("/getDetailItemList/:id", checkToken, getDetailItemList);

// router.patch("/DeleteItemList", checkToken, deleteItemListByReqno);

router.patch("/UpdateReqMaster", checkToken, UpdateReqMaster);
router.get("/getApprovList/others", checkToken, getApprovListOthers);

router.patch("/deleteItemList", checkToken, deleteItemDetails);
router.post("/editItemList", checkToken, EditItemListByReqno);

// dashboard
router.get("/getAllList/Dashboard", checkToken, getAllListDashboard);
router.get("/crfpurchase/Dashboard", checkToken, getCRFPurchaseDashboard);
router.get("/poApproval/Dashboard", checkToken, getpoApproovalDetails);
router.post("/delivery", checkToken, getDeliveryMarkingDetails);
router.get("/getpo/:id", checkToken, getAllPoDetails);
router.post("/checkItem", checkToken, getAllItemDetails);
router.post("/storeack", checkToken, getStoreAckDetails);
router.post("/userack", checkToken, getUserAckDetails);
router.post("/compCRF", checkToken, getCompletedCRF);

module.exports = router;