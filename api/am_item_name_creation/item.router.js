const router = require("express").Router();
const { ItemNameInsert, ItemNameview, ItemNameUpdate } = require('../am_item_name_creation/item.controller');

router.post('/insert', ItemNameInsert)
router.get('/view', ItemNameview)
router.patch('/update', ItemNameUpdate)
module.exports = router