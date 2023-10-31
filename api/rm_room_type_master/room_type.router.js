const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { RoomTypeInsert, RoomTypeView, RoomtypeUpdate } = require('../rm_room_type_master/room_type.controller');



router.post('/insert', checkToken, RoomTypeInsert)
router.get('/view', checkToken, RoomTypeView)
router.patch('/update', checkToken, RoomtypeUpdate)
module.exports = router