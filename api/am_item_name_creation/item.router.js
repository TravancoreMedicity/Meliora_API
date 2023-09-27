const router = require("express").Router();
const { ItemNameInsert, ItemNameview, ItemNameUpdate,
    itemInactive, getitemFromMaster, getitemFromMasterdemo
} = require('../am_item_name_creation/item.controller');

router.post('/insert', ItemNameInsert)
router.get('/view', ItemNameview)
router.patch('/update', ItemNameUpdate)
router.patch('/itemInactive', itemInactive)



router.post('/getItem', getitemFromMaster)

router.post('/getItemdemo', getitemFromMasterdemo)

module.exports = router