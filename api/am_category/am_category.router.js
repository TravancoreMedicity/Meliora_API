const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { CategoryInsert, CategoryView, CategoryUpdate } = require('../am_category/am_category.controller');

router.post('/insert', checkToken, CategoryInsert)
router.get('/view', checkToken, CategoryView)
router.patch('/update', checkToken, CategoryUpdate)
module.exports = router