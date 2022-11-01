const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { createmodulegruop, updatemodulegroup, getSelectgroupmast, getModuleGroupByID, deleteModuleGroup } = require('../module_group_mast/moduleGroup.controller');


router.post("/", checkToken, createmodulegruop);
router.patch("/", checkToken, updatemodulegroup);
router.get("/", checkToken, getSelectgroupmast);
router.get("/:id", checkToken, getModuleGroupByID);
router.delete("/", checkToken, deleteModuleGroup);




module.exports = router;