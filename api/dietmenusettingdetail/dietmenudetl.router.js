const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { requireMenuRight } = require("../../authentication/menuRights");
const { MENU_DIET_MENU_SETTING } = require("../../authentication/menuNumbers");
const { getItemmaster, dietmenusettingInsert, dietmenudtlSelect, updatedietmenusettingdtl, dmenuInsert,
    getItemmasterExtra, getItemRate } = require("../dietmenusettingdetail/dietmenudetl.controller")

router.get("/item/:id", checkToken, getItemmaster)
router.get("/item/rate/:id", checkToken, getItemRate)
router.get("/itemExtraOder", checkToken, getItemmasterExtra)
router.get("/", checkToken, dietmenudtlSelect)
// Writes need the right of the "Diet Menu Setting" screen (menu 55)
router.post("/detailInsert", checkToken, requireMenuRight(MENU_DIET_MENU_SETTING), dietmenusettingInsert)
router.patch("/update", checkToken, requireMenuRight(MENU_DIET_MENU_SETTING), updatedietmenusettingdtl)
router.post("/dmenu", checkToken, requireMenuRight(MENU_DIET_MENU_SETTING), dmenuInsert)
module.exports = router;