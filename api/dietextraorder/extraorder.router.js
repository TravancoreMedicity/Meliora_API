const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { getExtraorder, getItemrate, ExtraOrderInsert, ExtraOrderListInsert, getDietType,
    getExtraOrder, getExtraOrderDetail, updateExta } = require('../dietextraorder/extraorder.controller');

const { requireMenuRight } = require("../../authentication/menuRights");
const { MENU_DIET_PROCESS } = require("../../authentication/menuNumbers");

router.post("/", checkToken, getExtraorder);
router.post("/rate", checkToken, getItemrate);
router.post("/insert", checkToken, requireMenuRight(MENU_DIET_PROCESS), ExtraOrderInsert);
router.post("/insertextra", checkToken, requireMenuRight(MENU_DIET_PROCESS), ExtraOrderListInsert);
router.post("/dietType/get", checkToken, getDietType)
router.get('/getExtraOrder', checkToken, getExtraOrder)
router.get("/getExtraOrderDetail/:id", checkToken, getExtraOrderDetail)
router.patch("/updateExta", checkToken, requireMenuRight(MENU_DIET_PROCESS),updateExta)
module.exports = router;