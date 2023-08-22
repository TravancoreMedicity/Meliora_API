const router = require("express").Router();
const { PrimaryInsert, PrimaryView, PrimaryUpdate } = require('../am_primary_custodian/primary.controller');

router.post('/insert', PrimaryInsert)
router.get('/view', PrimaryView)
router.patch('/update', PrimaryUpdate)
module.exports = router