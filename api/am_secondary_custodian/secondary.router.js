const router = require("express").Router();
const { SecondaryInsert, SecondaryView, SecondaryUpdate } = require('../am_secondary_custodian/secondary.controller');

router.post('/insert', SecondaryInsert)
router.get('/view', SecondaryView)
router.patch('/update', SecondaryUpdate)
module.exports = router