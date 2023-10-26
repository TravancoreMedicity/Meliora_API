const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { SecondaryInsert, SecondaryView, SecondaryUpdate } = require('../am_secondary_custodian/secondary.controller');

router.post('/insert', checkToken, SecondaryInsert)
router.get('/view', checkToken, SecondaryView)
router.patch('/update', checkToken, SecondaryUpdate)
module.exports = router