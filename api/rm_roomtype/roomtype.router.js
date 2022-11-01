const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { roomtypeInsert, getRoomtype, updateRoomtype, inactiveRoomtype, getRoomoracle } = require('../rm_roomtype/roomtype.controller')

router.post("/", checkToken, roomtypeInsert);
router.get("/", checkToken, getRoomtype);
router.patch("/", checkToken, updateRoomtype);
router.patch("/inactive", checkToken, inactiveRoomtype);
router.get("/rmtypeoracle", checkToken, getRoomoracle);

module.exports = router;