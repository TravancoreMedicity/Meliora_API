const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { getPurchaseAckPending, InsertPurchaseAck, getAllApprovedForPurchase, QuatationCalling, QuatationNegotiation,
    QuatationFixing, InsertMultiplePO, getPOList, PoComplete, PoFinals, PurchsDataCollectionPending, getCRSStores,
    getPOItemDetails, getPendingPOItemDetails, getPendingPo, updatePoApprovals, CheckPOExist, getSubstores
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
router.get("/getPOList/:id", checkToken, getPOList);
router.patch("/PoComplete", checkToken, PoComplete);
router.patch("/PoFinals", checkToken, PoFinals);
router.post("/poExist", checkToken, CheckPOExist);
router.get("/getitem/:id", checkToken, getPOItemDetails);
router.get("/getPO", checkToken, getPendingPo);
router.get("/POPending", checkToken, getPendingPOItemDetails);
router.post('/updateApprovalLevel', updatePoApprovals);
router.get("/getSubstores/:id", checkToken, getSubstores);




// router.get("/potoStore/:id", checkToken, getPODetailsForStore);
// router.post("/InsertinglePO", checkToken, InsertinglePO)
// router.patch("/postart", checkToken, updatePOAdd);
// router.post("/InsertPOItems", checkToken, InsertPOItems);
// router.get("/getAllApprovedForStore", checkToken, getAllApprovedForStore);
// router.patch("/storedataUpdate", checkToken, storedataUpdate);
// router.get("/getSubstores", checkToken, getSubstores);
// router.get("/getMainStore/:id", checkToken, getMainStore);


// substore
// router.patch("/storeReciverdataUpdate", checkToken, storeReciverdataUpdate);
// router.get("/getPOListSubStorewise/:id", checkToken, getPOListSubStorewise);
// router.patch("/SubstoreReciverdataUpdate", checkToken, SubstoreReciverdataUpdate);


module.exports = router;