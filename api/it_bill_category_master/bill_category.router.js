const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { BillCategoryInsert, BillCategoryView, BillCategoryUpdate } = require('../it_bill_category_master/bill_category.controller');

router.post('/insert', checkToken, BillCategoryInsert)
router.get('/view', checkToken, BillCategoryView)
router.patch('/update', checkToken, BillCategoryUpdate)
module.exports = router