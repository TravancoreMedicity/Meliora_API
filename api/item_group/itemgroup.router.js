const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { itemgroupInsert, getItemgroup, updateItemgrp, getItemgrpname, insertGroupItemMaster, getItemGroupMaster, updateItemGroupMaster } = require('../item_group/itemgroup.controller')


router.post("/insert", checkToken, itemgroupInsert)
router.get("/getitem", checkToken, getItemgroup)
router.patch("/itemgrp/update", checkToken, updateItemgrp)
router.get('/getgrpname', checkToken, getItemgrpname)



router.post("/insertgroupdtl", checkToken, insertGroupItemMaster);
router.get("/getallgroupdtl", checkToken, getItemGroupMaster);
router.patch("/itemgrpdtl/update", checkToken, updateItemGroupMaster);

module.exports = router;