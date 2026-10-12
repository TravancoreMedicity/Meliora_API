const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { requireMenuRight } = require("../../authentication/menuRights");
const { MENU_DIET_MASTER } = require("../../authentication/menuNumbers");
const { dietInsertData, dietUpdateData, dietSelectData, dietGetDataById, roomSelectData } = require("../diet/diet.controller");

// Old "Diet" master screen (its menu entry is commented out; the number it had was 36). Writes need that right.
router.post("/", checkToken, requireMenuRight(MENU_DIET_MASTER), dietInsertData);

router.patch("/", checkToken, requireMenuRight(MENU_DIET_MASTER), dietUpdateData);

router.get("/", checkToken, dietSelectData);

router.post("/byid", checkToken, dietGetDataById);

router.get("/select", checkToken, roomSelectData);

module.exports = router;