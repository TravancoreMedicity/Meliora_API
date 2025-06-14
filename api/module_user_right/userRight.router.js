const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { createModuleUserRight, updateModuleUserRight, getUserModuleRightsByID, getUserModuleRights, deleteUserGroup ,getEmpComponentsRights} = require('../module_user_right/userRight.controller');

router.post("/", checkToken, createModuleUserRight);
router.patch("/", checkToken, updateModuleUserRight);
router.get("/", checkToken, getUserModuleRights);
router.get("/:id", checkToken, getUserModuleRightsByID);
router.delete("/", checkToken, deleteUserGroup);

router.get('/getEmpComponentsRights/:id', checkToken, getEmpComponentsRights)

module.exports = router;