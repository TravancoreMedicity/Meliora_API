const router = require("express").Router();
const { FloorInsert, FloorView, FloorUpdate } = require('../rm_floor_creation/rm_floor.controller');



router.post('/insert', FloorInsert)
router.get('/view', FloorView)
router.patch('/updatee', FloorUpdate)
module.exports = router