const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { itemgroupInsert, getItemgroup, updateItemgrp, getItemgrpname } = require('../item_group/itemgroup.controller')


router.post("/insert", checkToken, itemgroupInsert)
router.get("/getitem", checkToken, getItemgroup)
router.patch("/itemgrp/update", checkToken, updateItemgrp)
router.get('/getgrpname', checkToken, getItemgrpname)

module.exports = router;