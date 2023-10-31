const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { SubCategoryInsert, SubCategoryView, SubCategoryUpdate } = require('../am_subcategory/am_subcategory.controller');

router.post('/insert', checkToken, SubCategoryInsert)
router.get('/view', checkToken, SubCategoryView)
router.patch('/update', checkToken, SubCategoryUpdate)
module.exports = router