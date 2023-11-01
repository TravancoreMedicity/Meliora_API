const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { ManufactureInsert, ManufactureView, ManufactureUpdate } = require('../am_manufacture/manufacture.controller');

router.post('/insert', checkToken, ManufactureInsert)
router.get('/view', checkToken, ManufactureView)
router.patch('/update', checkToken, ManufactureUpdate)
module.exports = router