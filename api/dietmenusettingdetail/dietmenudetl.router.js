const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getItemmaster, dietmenusettingInsert, dietmenudtlSelect, updatedietmenusettingdtl, dmenuInsert } = require("../dietmenusettingdetail/dietmenudetl.controller")

router.get("/item", checkToken, getItemmaster)
router.get("/", checkToken, dietmenudtlSelect)
router.post("/detailInsert", checkToken, dietmenusettingInsert)
router.patch("/update", checkToken, updatedietmenusettingdtl)
router.post("/dmenu", checkToken, dmenuInsert)
module.exports = router;