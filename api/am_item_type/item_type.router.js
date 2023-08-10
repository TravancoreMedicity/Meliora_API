const router = require("express").Router();
const { ItemTypeInsert, ItemTypeView, ItemTypeUpdate } = require('../am_item_type/item_type.controller');

router.post('/insert', ItemTypeInsert)
router.get('/view', ItemTypeView)
router.patch('/update', ItemTypeUpdate)
module.exports = router