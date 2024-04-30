const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { InsertPoDetailsLog, getPORecivedList, InsertPoDetailsLogFully, SubstoreReciverdataUpdate,
    getCRSStorePending, getCrsReceiceAllList, getPOListSubStorewisePend, getPOListSubStorewiseAllList
} = require('../crm_store_functns/crm_store.controller')

// router.patch("/PoMastUpdateFulRecev", checkToken, PoMastUpdateFulRecev);

router.get("/getCRSStorePending", checkToken, getCRSStorePending);
router.get("/getCrsReceiceAllList", checkToken, getCrsReceiceAllList);
router.get("/getPORecivedList/:id", checkToken, getPORecivedList);
router.post("/InsertPoDetailsLog", checkToken, InsertPoDetailsLog);
router.post("/InsertPoDetailsLogFully", checkToken, InsertPoDetailsLogFully);
router.get("/getPOListSubStorewisePend/:id", checkToken, getPOListSubStorewisePend);
router.get("/getPOListSubStorewiseAllList/:id", checkToken, getPOListSubStorewiseAllList);
router.patch("/SubstoreReciverdataUpdate", checkToken, SubstoreReciverdataUpdate);
module.exports = router;