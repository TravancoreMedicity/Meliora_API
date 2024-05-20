const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { SupplierDetailInsert, SupplierDetailView, SupplierDetailUpdate } = require('../it_bill_supplier_detail_master/supp_detail.controller');

router.post('/insert', checkToken, SupplierDetailInsert)
router.get('/view', checkToken, SupplierDetailView)
router.patch('/update', checkToken, SupplierDetailUpdate)
module.exports = router