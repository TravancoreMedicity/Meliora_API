const router = require("express").Router();
const { FloorInsert, FloorView, FloorUpdate } = require('../rm_floor_master/floor_mast.controller');



router.post('/insert', FloorInsert)
router.get('/view', FloorView)
router.patch('/update', FloorUpdate)
module.exports = router