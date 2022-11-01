const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { diettypeInsertData, diettypeUpdateData, diettypeSelectData, diettypeGetDataById } = require("../diettype/diettype.controller");

router.post("/", checkToken, diettypeInsertData);

router.patch("/", checkToken, diettypeUpdateData);

router.get("/", checkToken, diettypeSelectData);

router.post("/byid", checkToken, diettypeGetDataById);

module.exports = router;