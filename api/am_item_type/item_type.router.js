const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { ItemTypeInsert, ItemTypeView, ItemTypeUpdate } = require('../am_item_type/item_type.controller');

router.post('/insert', checkToken, ItemTypeInsert)
router.get('/view', checkToken, ItemTypeView)
router.patch('/update', checkToken, ItemTypeUpdate)
module.exports = router