const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { InsertPurchaseAck, getAllApprovedForPurchase, QuatationCalling, QuatationNegotiation,
    QuatationFixing, InsertinglePO, InsertMultiplePO, getPOList, PoComplete,
    PoFinals, getAllApprovedForStore, storedataUpdate

} = require('../crm_new_purchase/crm_purchase.controller')



router.get("/getAllApprovedForPurchase", checkToken, getAllApprovedForPurchase);
router.post("/InsertPurchaseAck", checkToken, InsertPurchaseAck);

router.patch("/QuatationCalling", checkToken, QuatationCalling);
router.patch("/QuatationNegotiation", checkToken, QuatationNegotiation);
router.patch("/QuatationFixing", checkToken, QuatationFixing);


router.post("/InsertinglePO", checkToken, InsertinglePO)
router.post("/InsertMultiplePO", checkToken, InsertMultiplePO);
router.get("/getPOList/:id", checkToken, getPOList);

router.patch("/PoComplete", checkToken, PoComplete);
router.patch("/PoFinals", checkToken, PoFinals);

router.get("/getAllApprovedForStore", checkToken, getAllApprovedForStore);
router.patch("/storedataUpdate", checkToken, storedataUpdate);


module.exports = router;