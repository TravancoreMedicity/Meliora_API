const router = require("express").Router();
const { SubGroupInsert, SubGroupView, SubGroupUpdate } = require('../am_sub_group/sub_group.controller');

router.post('/insert', SubGroupInsert)
router.get('/view', SubGroupView)
router.patch('/update', SubGroupUpdate)
module.exports = router