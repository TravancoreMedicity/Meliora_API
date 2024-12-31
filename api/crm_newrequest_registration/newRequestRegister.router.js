const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { requestRegistInsert, InHodExist, getAllReqBasedDept, getDetailItemList, UpdateReqMaster,
    getApprovListOthers, getCrfStoreDetailsDashborad, getAllListDashboard, getAllReqBasedDeptreq, deleteItemDetails,
    getCRFPurchaseDashboard, getDeliveryMarkingDetails, getAllPoDetails, getAllItemDetails, getStoreAckDetails,
    getUserAckDetails, getCompletedCRF, getAllPendingApprovalsAboveHOD, getPoList, searchCrfDetails,
    getApprvPendingDashboard, getAprvlDetailsView, gePurchaseDetails, getPurchaseApprvlView,
    getCRFStoreDetails, getStoreApprvlViewCRF, getAllHoldAndRejectItems
} = require('../crm_newrequest_registration/newRequestRegister.controller');

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


// router.post("/editItemList", checkToken, EditItemListByReqno);

// dashboard
// CRF Approval Status
router.get("/getAllList/Dashboard", checkToken, getAllListDashboard);
router.get("/getApprvPending/Dashboard/:id", checkToken, getApprvPendingDashboard);
router.get("/AprvlDetailsView/:id", checkToken, getAprvlDetailsView);

router.get("/crfpurchase/Dashboard", checkToken, getCRFPurchaseDashboard);
router.get("/gePurchaseDetails/Dashboard/:id", checkToken, gePurchaseDetails);
router.post("/purchaseApprvlView", checkToken, getPurchaseApprvlView);

router.get("/crfStore/Dashboard", checkToken, getCrfStoreDetailsDashborad);
router.get("/getStore/Dashboard/:id", checkToken, getCRFStoreDetails);
router.post("/storeApprvlView", checkToken, getStoreApprvlViewCRF);

router.post("/delivery", checkToken, getDeliveryMarkingDetails);

router.get("/getpo/:id", checkToken, getAllPoDetails);
router.post("/checkItem", checkToken, getAllItemDetails);
router.post("/storeack", checkToken, getStoreAckDetails);
router.post("/userack", checkToken, getUserAckDetails);
router.post("/compCRF", checkToken, getCompletedCRF);


router.post("/getPendingList", checkToken, getAllPendingApprovalsAboveHOD);
router.post("/getHoldRejectItems", checkToken, getAllHoldAndRejectItems);
router.post("/getPOList", checkToken, getPoList);
router.post('/searchCrf', checkToken, searchCrfDetails);


module.exports = router;