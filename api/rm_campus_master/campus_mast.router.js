const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { CampusInsert, CampusView, CampusUpdate } = require('../rm_campus_master/campus_mast.controller');

router.post('/insert', checkToken, CampusInsert)
router.get('/view', checkToken, CampusView)
router.patch('/update', checkToken, CampusUpdate)
module.exports = router