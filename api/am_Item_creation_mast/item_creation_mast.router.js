const router = require("express").Router();
const { ItemcreationdeptInsert, insertItemAdditional, getInsertData, getItemsFronList
} = require('../am_Item_creation_mast/item_creation_mast.controller');

router.post('/insert', ItemcreationdeptInsert)
router.post('/insertItemAdditional', insertItemAdditional)
router.post('/getInsertData', getInsertData)

router.post('/getItemsFronList', getItemsFronList)


module.exports = router