const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { InsideBuildBlockInsert, InsideBuildBlockView, InsideBuildBlockUpdate } = require('../rm_insidebuilblock_master/insidebuildblock.controller');



router.post('/insert', checkToken, InsideBuildBlockInsert)
router.get('/view', checkToken, InsideBuildBlockView)
router.patch('/update', checkToken, InsideBuildBlockUpdate)
module.exports = router