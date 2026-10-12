const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { requireMenuRight } = require("../../authentication/menuRights");
const { MENU_DIET_MASTER } = require("../../authentication/menuNumbers");
const { dietOrderInsert, getDietOrder, updateDietOrder, getRoom, getdietpatientname, getdiettypebyrmcslno,
    getitembytypeslno, getprocesstypeslno, getItemSlno } = require('../diet_order_list/dietOrder.controller')


// OLD order module: no screen calls /insert or /update/DietOrder any more (the live flow is /api/fooddietorder),
// so they are limited to the Diet Master right instead of staying open to every login.
router.post('/insert', checkToken, requireMenuRight(MENU_DIET_MASTER), dietOrderInsert)
router.get('/get/dietorder', checkToken, getDietOrder)
router.patch('/update/DietOrder', checkToken, requireMenuRight(MENU_DIET_MASTER), updateDietOrder);
router.post('/room', checkToken, getRoom)
router.post('/getrmptname', checkToken, getdietpatientname)
router.post('/typeslno', checkToken, getdiettypebyrmcslno)
router.post('/itemslno', checkToken, getitembytypeslno)


router.post('/getproslno/typeslno', checkToken, getprocesstypeslno)
router.post('/getItem/list', checkToken, getItemSlno)

module.exports = router;