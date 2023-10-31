const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { ItemcreationdeptInsert, insertItemAdditional, getInsertData, getItemsFronList
} = require('../am_Item_creation_mast/item_creation_mast.controller');

router.post('/insert', checkToken, ItemcreationdeptInsert)
router.post('/insertItemAdditional', checkToken, insertItemAdditional)
router.post('/getInsertData', checkToken, getInsertData)

router.post('/getItemsFronList', checkToken, getItemsFronList)


module.exports = router