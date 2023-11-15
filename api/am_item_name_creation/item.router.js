const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { ItemNameInsert, ItemNameview, ItemNameUpdate,
    getitemFromMaster, getitemFromMasterdemo, getItemSearchByName
} = require('../am_item_name_creation/item.controller');

router.post('/insert', checkToken, ItemNameInsert)
router.get('/view', checkToken, ItemNameview)
router.patch('/update', checkToken, ItemNameUpdate)
router.post('/getItem', checkToken, getitemFromMaster)
router.post('/getItemdemo', checkToken, getitemFromMasterdemo)

router.post('/getItemByName', checkToken, getItemSearchByName)
module.exports = router