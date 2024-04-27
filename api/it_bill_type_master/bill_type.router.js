const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { BillTypeInsert, BillTypeView, BillTypeUpdate } = require('../it_bill_type_master/bill_type.controller');

router.post('/insert', checkToken, BillTypeInsert)
router.get('/view', checkToken, BillTypeView)
router.patch('/update', checkToken, BillTypeUpdate)
module.exports = router