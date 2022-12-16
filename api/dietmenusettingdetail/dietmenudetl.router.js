const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getItemmaster, dietmenusettingInsert, dietmenudtlSelect, updatedietmenusettingdtl, dmenuInsert,
    getItemmasterExtra, getItemRate } = require("../dietmenusettingdetail/dietmenudetl.controller")

router.get("/item/:id", checkToken, getItemmaster)
router.get("/item/rate/:id", checkToken, getItemRate)
router.get("/item/extra", checkToken, getItemmasterExtra)
router.get("/", checkToken, dietmenudtlSelect)
router.post("/detailInsert", checkToken, dietmenusettingInsert)
router.patch("/update", checkToken, updatedietmenusettingdtl)
router.post("/dmenu", checkToken, dmenuInsert)
module.exports = router;