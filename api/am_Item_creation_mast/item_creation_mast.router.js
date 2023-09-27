const router = require("express").Router();
const { ItemcreationdeptInsert, insertItemAdditional, getInsertData } = require('../am_Item_creation_mast/item_creation_mast.controller');

router.post('/insert', ItemcreationdeptInsert)
router.post('/insertItemAdditional', insertItemAdditional)
router.post('/getInsertData', getInsertData)



module.exports = router