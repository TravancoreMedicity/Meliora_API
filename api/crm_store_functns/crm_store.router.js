const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { InsertPoDetailsLog, getPORecivedList, InsertPoDetailsLogFully, SubstoreReciverdataUpdate
} = require('../crm_store_functns/crm_store.controller')


router.post("/InsertPoDetailsLog", checkToken, InsertPoDetailsLog);
router.get("/getPORecivedList/:id", checkToken, getPORecivedList);
router.post("/InsertPoDetailsLogFully", checkToken, InsertPoDetailsLogFully);

router.patch("/SubstoreReciverdataUpdate", checkToken, SubstoreReciverdataUpdate);

module.exports = router;