const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { subroomcreationInsert, getsubroomCreation, updatesubRoomCreation, getroomMasteremeliora } = require('../rm_subroomcreation/subroom.controller')

router.post("/", checkToken, subroomcreationInsert);
router.get("/", checkToken, getsubroomCreation);
router.patch("/", checkToken, updatesubRoomCreation);
router.get("/rmmelimaster", checkToken, getroomMasteremeliora);

module.exports = router;