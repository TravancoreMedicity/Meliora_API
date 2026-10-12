const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { requireMenuRight } = require("../../authentication/menuRights");
const { MENU_DIET_TYPE } = require("../../authentication/menuNumbers");
const { diettypeInsertData, diettypeUpdateData, diettypeSelectData, diettypeGetDataById } = require("../diettype/diettype.controller");

// Writes need the right of the "Diet Type" screen (menu 39); the list is read by many screens.
router.post("/", checkToken, requireMenuRight(MENU_DIET_TYPE), diettypeInsertData);

router.patch("/", checkToken, requireMenuRight(MENU_DIET_TYPE), diettypeUpdateData);

router.get("/", checkToken, diettypeSelectData);

router.post("/byid", checkToken, diettypeGetDataById);

module.exports = router;