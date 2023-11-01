const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { BuildBlockInsert, BuildBlockView, BuildBlockUpdate } = require('../rm_buildblock_master/buildblock.controller');


router.post('/insert', checkToken, BuildBlockInsert)
router.get('/view', checkToken, BuildBlockView)
router.patch('/update', checkToken, BuildBlockUpdate)

module.exports = router