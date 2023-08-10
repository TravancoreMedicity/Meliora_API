const router = require("express").Router();
const { CategoryInsert, CategoryView, CategoryUpdate } = require('../am_category/am_category.controller');

router.post('/insert', CategoryInsert)
router.get('/view', CategoryView)
router.patch('/update', CategoryUpdate)
module.exports = router