const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { RoomInsert, RoomView, RoomUpdate, roomgetById, lastUpdatedRoomgetById } = require('../rm_roomnew_creation/rm_newroom.controller');

router.post('/insert', checkToken, RoomInsert)
router.get('/view', checkToken, RoomView)
router.patch('/update', checkToken, RoomUpdate)
router.get('/byid/:id', checkToken, roomgetById)
router.get('/lastupdatebyid/:id', checkToken, lastUpdatedRoomgetById)

module.exports = router