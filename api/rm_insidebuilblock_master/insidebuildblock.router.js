const router = require("express").Router();
const { InsideBuildBlockInsert, InsideBuildBlockView, InsideBuildBlockUpdate } = require('../rm_insidebuilblock_master/insidebuildblock.controller');



router.post('/insert', InsideBuildBlockInsert)
router.get('/view', InsideBuildBlockView)
router.patch('/update', InsideBuildBlockUpdate)
module.exports = router