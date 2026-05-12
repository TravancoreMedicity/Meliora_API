const { checkToken } = require('../../authentication/token_validation');
const { getAllOrderPartyType, insertAllOrderPartyType, updateAllOrderPartyType } = require('./orderpartyType.controller');

const router = require('express').Router();


router.post("/insert", checkToken, insertAllOrderPartyType);
router.get("/getallordertype", checkToken, getAllOrderPartyType);
router.patch("/update", checkToken, updateAllOrderPartyType);

// router.post("/fetchdatabyid", checkToken, getAllItemCategory);

module.exports = router;