const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { kotItemInsert, getKotitem, updatekotitem } = require('../kot_item_master/kotitem.controller')


router.post("/insert", checkToken, kotItemInsert)
router.get("/get/kotitem", checkToken, getKotitem)
router.patch("/update/kotitem", checkToken, updatekotitem)

module.exports = router;