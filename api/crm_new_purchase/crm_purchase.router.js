const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { getPurchaseAckPending, InsertPurchaseAck, getAllApprovedForPurchase, QuatationCalling, QuatationNegotiation,
    QuatationFixing, InsertMultiplePO, getPOList, PoComplete, PoFinals, PurchsDataCollectionPending, getCRSStores,
    getPOItemDetails, getPendingPOItemDetails, getPendingPo, updatePoApprovals, CheckPOExist, getSubstores, getPoDetails, InsertWorkOrder
} = require('../crm_new_purchase/crm_purchase.controller')

router.get("/getPurchaseAckPending", checkToken, getPurchaseAckPending);
router.get("/getAllApprovedForPurchase", checkToken, getAllApprovedForPurchase);
router.post("/InsertPurchaseAck", checkToken, InsertPurchaseAck);
router.patch("/QuatationCalling", checkToken, QuatationCalling);
router.patch("/QuatationNegotiation", checkToken, QuatationNegotiation);
router.patch("/QuatationFixing", checkToken, QuatationFixing);
router.get("/PurchsDataCollectionPending", checkToken, PurchsDataCollectionPending);
router.get("/crsStores", checkToken, getCRSStores);
router.post("/InsertMultiplePO", checkToken, InsertMultiplePO);
router.patch("/PoComplete", checkToken, PoComplete);
router.patch("/PoFinals", checkToken, PoFinals);
router.post("/poExist", checkToken, CheckPOExist);
router.get("/getitem/:id", checkToken, getPOItemDetails);
router.get("/getPO", checkToken, getPendingPo);
router.get("/POPending", checkToken, getPendingPOItemDetails);
router.post('/updateApprovalLevel', updatePoApprovals);
router.get("/getSubstores/:id", checkToken, getSubstores);
router.get("/getPoDetails/:id", checkToken, getPoDetails);


// used only for reportss
router.get("/getPOList/:id", checkToken, getPOList);
router.post("/InsertWorkOrder", checkToken, InsertWorkOrder);


module.exports = router;