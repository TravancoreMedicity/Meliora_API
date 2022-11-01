const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { getExtraorder, getItemrate, ExtraOrderInsert, ExtraOrderListInsert, getDietType } = require('../dietextraorder/extraorder.controller');

router.post("/", checkToken, getExtraorder);
router.post("/rate", checkToken, getItemrate);
router.post("/insert", checkToken, ExtraOrderInsert);
router.post("/insertextra", checkToken, ExtraOrderListInsert);
router.post("/dietType/get", checkToken, getDietType)


module.exports = router;