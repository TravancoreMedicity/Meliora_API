const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { moduleGroupRightInsert, getmoduleGroupRight, moduleGroupRightUpdate, getdataById, moduleUpdate, moduleDelete } = require('../module_group_right/modGroupRight.controller')

router.post("/", checkToken, moduleGroupRightInsert);
router.get("/", checkToken, getmoduleGroupRight);
// router.get("/:id", checkToken, moduleMasterById);
router.patch("/", checkToken, moduleGroupRightUpdate);
router.post("/getById", checkToken, getdataById)
// router.delete("/", checkToken, moduleDelete);


module.exports = router;