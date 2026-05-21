const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { createmodulegruop, updatemodulegroup, getSelectgroupmast, getModuleGroupByID, deleteMenuMaster, insertMenuMaster, updateMenuMaster } = require('../menu_master/menuMaster.controller');

router.post("/", checkToken, createmodulegruop);
router.patch("/", checkToken, updatemodulegroup);
router.get("/", checkToken, getSelectgroupmast);
router.get("/:id", checkToken, getModuleGroupByID);
router.delete("/", checkToken, deleteMenuMaster);

router.get('/menu/getallmenu', checkToken, getSelectgroupmast)
router.post('/menu/insertmenu', checkToken, insertMenuMaster)
router.patch('/menu/updatemenu', checkToken, updateMenuMaster)



module.exports = router;