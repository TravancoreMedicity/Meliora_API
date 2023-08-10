const router = require("express").Router();
const { RoomTypeInsert, RoomTypeView, RoomtypeUpdate } = require('../rm_room_type_master/room_type.controller');



router.post('/insert', RoomTypeInsert)
router.get('/view', RoomTypeView)
router.patch('/update', RoomtypeUpdate)
module.exports = router