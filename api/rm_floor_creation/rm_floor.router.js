const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { FloorInsert, FloorView, FloorUpdate } = require('../rm_floor_creation/rm_floor.controller');



router.post('/insert', checkToken, FloorInsert)
router.get('/view', checkToken, FloorView)
router.patch('/updatee', checkToken, FloorUpdate)
module.exports = router