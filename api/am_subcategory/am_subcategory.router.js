const router = require("express").Router();
const { SubCategoryInsert, SubCategoryView, SubCategoryUpdate } = require('../am_subcategory/am_subcategory.controller');

router.post('/insert', SubCategoryInsert)
router.get('/view', SubCategoryView)
router.patch('/update', SubCategoryUpdate)
module.exports = router