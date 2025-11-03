const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { CategoryInsert, CategoryView, CategoryUpdate, RegimageGet } = require('../am_category/am_category.controller');

router.post('/insert', checkToken, CategoryInsert)
router.get('/view', checkToken, CategoryView)
router.patch('/update', checkToken, CategoryUpdate)

router.get("/getfile/:id", checkToken, RegimageGet)

module.exports = router