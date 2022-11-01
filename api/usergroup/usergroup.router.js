const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { usergroupInsert, usergroupupdate, getUsergroup, getdataById, getUsergroupByid, deleteUsergroup } = require("../usergroup/usergroup.controller")

router.post("/", checkToken, usergroupInsert)
router.patch('/', checkToken, usergroupupdate);
router.get("/", checkToken, getUsergroup);
router.get("/:id", checkToken, getUsergroupByid);
router.post("/getById", checkToken, getdataById)
router.delete("/", checkToken, deleteUsergroup);


module.exports = router;