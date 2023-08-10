const router = require("express").Router();
const { CampusInsert, CampusView, CampusUpdate } = require('../rm_campus_master/campus_mast.controller');

router.post('/insert', CampusInsert)
router.get('/view', CampusView)
router.patch('/update', CampusUpdate)
module.exports = router