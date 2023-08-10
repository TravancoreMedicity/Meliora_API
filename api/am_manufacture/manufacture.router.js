const router = require("express").Router();
const { ManufactureInsert, ManufactureView, ManufactureUpdate } = require('../am_manufacture/manufacture.controller');

router.post('/insert', ManufactureInsert)
router.get('/view', ManufactureView)
router.patch('/update', ManufactureUpdate)
module.exports = router