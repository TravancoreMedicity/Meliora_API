const router = require("express").Router();
const { RoomInsert, RoomView, RoomUpdate, roomgetById ,lastUpdatedRoomgetById} = require('../rm_roomnew_creation/rm_newroom.controller');

router.post('/insert', RoomInsert)
router.get('/view', RoomView)
router.patch('/update', RoomUpdate)
router.get('/byid/:id', roomgetById)
router.get('/lastupdatebyid/:id', lastUpdatedRoomgetById)

module.exports = router