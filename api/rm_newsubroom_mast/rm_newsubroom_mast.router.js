const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { newSubRoomInsert, newSubRoomView, newSubRoomUpdate } = require('../rm_newsubroom_mast/rm_nesubroom_mast.controller');

router.post('/insert', checkToken, newSubRoomInsert)
router.get('/view', checkToken, newSubRoomView)
router.patch('/update', checkToken, newSubRoomUpdate)
module.exports = router