const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { createModuleUserRight, updateModuleUserRight, getUserModuleRightsByID, getUserModuleRights, deleteUserGroup } = require('../module_user_right/userRight.controller');

router.post("/", checkToken, createModuleUserRight);
router.patch("/", checkToken, updateModuleUserRight);
router.get("/", checkToken, getUserModuleRights);
router.get("/:id", checkToken, getUserModuleRightsByID);
router.delete("/", checkToken, deleteUserGroup);

module.exports = router;