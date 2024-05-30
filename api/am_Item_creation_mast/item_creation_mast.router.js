const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { ItemcreationdeptInsert, insertItemAdditional, getInsertData, getItemsFronList, itemInactive,
    ItemcreationdeptInsertSpare, insertSpareItemAdditional, getInsertSpareData, itemInactiveSpare,
    getSpareItemsFronList, getDataBySerialNo
} = require('../am_Item_creation_mast/item_creation_mast.controller');

router.post('/insert', checkToken, ItemcreationdeptInsert)
router.post('/insertItemAdditional', checkToken, insertItemAdditional)
router.post('/getInsertData', checkToken, getInsertData)
router.patch('/itemInactive', checkToken, itemInactive)
router.post('/getItemsFronList', checkToken, getItemsFronList)

router.post('/insertSpare', checkToken, ItemcreationdeptInsertSpare)
router.post('/insertSpareItemAdditional', checkToken, insertSpareItemAdditional)
router.post('/getInsertSpareData', checkToken, getInsertSpareData)
router.patch('/itemInactiveSpare', checkToken, itemInactiveSpare)
router.post('/getSpareItemsFronList', checkToken, getSpareItemsFronList)

router.post('/getDataBySerialNo', checkToken, getDataBySerialNo)

module.exports = router