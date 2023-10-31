const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { SubGroupInsert, SubGroupView, SubGroupUpdate } = require('../am_sub_group/sub_group.controller');

router.post('/insert', checkToken, SubGroupInsert)
router.get('/view', checkToken, SubGroupView)
router.patch('/update', checkToken, SubGroupUpdate)
module.exports = router