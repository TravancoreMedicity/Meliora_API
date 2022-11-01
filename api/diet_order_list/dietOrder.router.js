const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { dietOrderInsert, getDietOrder, updateDietOrder, getRoom, getdietpatientname, getdiettypebyrmcslno,
    getitembytypeslno, getprocesstypeslno, getItemSlno } = require('../diet_order_list/dietOrder.controller')


router.post('/insert', checkToken, dietOrderInsert)
router.get('/get/dietorder', checkToken, getDietOrder)
router.patch('/update/DietOrder', checkToken, updateDietOrder);
router.post('/room', checkToken, getRoom)
router.post('/getrmptname', checkToken, getdietpatientname)
router.post('/typeslno', checkToken, getdiettypebyrmcslno)
router.post('/itemslno', checkToken, getitembytypeslno)


router.post('/getproslno/typeslno', checkToken, getprocesstypeslno)
router.post('/getItem/list', checkToken, getItemSlno)

module.exports = router;