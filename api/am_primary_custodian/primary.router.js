const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { PrimaryInsert, PrimaryView, PrimaryUpdate } = require('../am_primary_custodian/primary.controller');

router.post('/insert', checkToken, PrimaryInsert)
router.get('/view', checkToken, PrimaryView)
router.patch('/update', checkToken, PrimaryUpdate)
module.exports = router