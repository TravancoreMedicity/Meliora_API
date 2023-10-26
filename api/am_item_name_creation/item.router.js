const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { ItemNameInsert, ItemNameview, ItemNameUpdate,
    itemInactive, getitemFromMaster, getitemFromMasterdemo
} = require('../am_item_name_creation/item.controller');

router.post('/insert', checkToken, ItemNameInsert)
router.get('/view', checkToken, ItemNameview)
router.patch('/update', checkToken, ItemNameUpdate)
router.patch('/itemInactive', checkToken, itemInactive)


router.post('/getItem', checkToken, getitemFromMaster)

router.post('/getItemdemo', checkToken, getitemFromMasterdemo)

module.exports = router