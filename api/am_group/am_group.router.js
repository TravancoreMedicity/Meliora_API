const router = require("express").Router();
const { GroupInsert, GroupView, GroupUpdate } = require('../am_group/am_group.controller');

router.post('/insert', GroupInsert)
router.get('/view', GroupView)
router.patch('/update', GroupUpdate)
module.exports = router