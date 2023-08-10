const router = require("express").Router();
const { BuildBlockInsert, BuildBlockView, BuildBlockUpdate } = require('../rm_buildblock_master/buildblock.controller');


router.post('/insert', BuildBlockInsert)
router.get('/view', BuildBlockView)
router.patch('/update', BuildBlockUpdate)

module.exports = router