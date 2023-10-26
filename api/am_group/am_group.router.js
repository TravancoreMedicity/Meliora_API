const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { GroupInsert, GroupView, GroupUpdate } = require('../am_group/am_group.controller');

router.post('/insert', checkToken, GroupInsert)
router.get('/view', checkToken, GroupView)
router.patch('/update', checkToken, GroupUpdate)
module.exports = router