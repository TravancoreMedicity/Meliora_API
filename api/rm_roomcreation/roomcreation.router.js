const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { roomcreationInsert, getroomCreation, updateRoomCreation, getroomTypemeliora, getroomOraclermmaster,
    getoraRoomByType, getMeliRoomMaster } = require('../rm_roomcreation/roomcreation.controller');

router.post("/", checkToken, roomcreationInsert);
router.get("/", checkToken, getroomCreation);
router.patch("/", checkToken, updateRoomCreation);
router.get("/rmtype", checkToken, getroomTypemeliora);
router.get("/rmoramster", checkToken, getroomOraclermmaster);


router.get("/oraroom/:id", checkToken, getoraRoomByType)
router.get("/meliroom", checkToken, getMeliRoomMaster);
module.exports = router;