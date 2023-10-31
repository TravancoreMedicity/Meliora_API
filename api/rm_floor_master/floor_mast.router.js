const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { FloorInsert, FloorView, FloorUpdate } = require('../rm_floor_master/floor_mast.controller');



router.post('/insert', checkToken, FloorInsert)
router.get('/view', checkToken, FloorView)
router.patch('/update', checkToken, FloorUpdate)
module.exports = router