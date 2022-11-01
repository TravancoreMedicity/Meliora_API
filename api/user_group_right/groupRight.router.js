const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { getMenuName, updateGroupMenuRits, usergroupRightupdate, getUsergroupRight, getdataById, getUsergroupRightByid,
    deleteUsergroupRight } = require("../user_group_right/groupRight.controller")


router.post("/getMenu", checkToken, getMenuName)
router.patch("/", checkToken, updateGroupMenuRits)
router.patch('/updateuserright', checkToken, usergroupRightupdate);
router.get("/", checkToken, getUsergroupRight);
router.get("/:id", checkToken, getUsergroupRightByid);
router.post("/getById", checkToken, getdataById)
router.delete("/", checkToken, deleteUsergroupRight);


module.exports = router;