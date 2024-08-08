const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { getPurchaseAckPending, InsertPurchaseAck, getAllApprovedForPurchase, QuatationCalling, QuatationNegotiation,
    QuatationFixing, InsertMultiplePO, getPOList, PoComplete, PoFinals, getAllApprovedForStore, storedataUpdate,
    getSubstores, getMainStore, storeReciverdataUpdate, getPOListSubStorewise, SubstoreReciverdataUpdate,
    PurchsDataCollectionPending, getCRSStores, getOPItemDetails, getPendingPOItemDetails, getPendingPo, updatePoApprovals,
    getPODetailsForStore
} = require('../crm_new_purchase/crm_purchase.controller')

router.get("/getPurchaseAckPending", checkToken, getPurchaseAckPending);

router.get("/getAllApprovedForPurchase", checkToken, getAllApprovedForPurchase);
router.post("/InsertPurchaseAck", checkToken, InsertPurchaseAck);
router.patch("/QuatationCalling", checkToken, QuatationCalling);
router.patch("/QuatationNegotiation", checkToken, QuatationNegotiation);
router.patch("/QuatationFixing", checkToken, QuatationFixing);
// router.post("/InsertinglePO", checkToken, InsertinglePO)
router.post("/InsertMultiplePO", checkToken, InsertMultiplePO);
router.get("/getPOList/:id", checkToken, getPOList);
router.patch("/PoComplete", checkToken, PoComplete);
router.patch("/PoFinals", checkToken, PoFinals);
router.get("/getAllApprovedForStore", checkToken, getAllApprovedForStore);
router.patch("/storedataUpdate", checkToken, storedataUpdate);
router.get("/getSubstores", checkToken, getSubstores);
router.get("/getMainStore/:id", checkToken, getMainStore);
router.patch("/storeReciverdataUpdate", checkToken, storeReciverdataUpdate);
router.get("/getPOListSubStorewise/:id", checkToken, getPOListSubStorewise);
router.patch("/SubstoreReciverdataUpdate", checkToken, SubstoreReciverdataUpdate);
router.get("/PurchsDataCollectionPending", checkToken, PurchsDataCollectionPending);
router.get("/crsStores", checkToken, getCRSStores);

// router.post("/InsertPOItems", checkToken, InsertPOItems);
// router.post("/poExist", checkToken, CheckPOExist);
// router.patch("/postart", checkToken, updatePOAdd);
router.get("/getitem/:id", checkToken, getOPItemDetails);
router.get("/getPO", checkToken, getPendingPo);
router.get("/POPending", checkToken, getPendingPOItemDetails);
router.post('/updateApprovalLevel', updatePoApprovals);
router.get("/potoStore/:id", checkToken, getPODetailsForStore);

module.exports = router;