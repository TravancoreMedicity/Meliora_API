const router = require("express").Router();
const { RoomInsert, RoomView, RoomUpdate } = require('../rm_roomnew_creation/rm_newroom.controller');

router.post('/insert', RoomInsert)
router.get('/view', RoomView)
router.patch('/update', RoomUpdate)
module.exports = router