const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { UomInsert, Uomview, UomUpdate } = require('../am_uom/uom.controller');

router.post('/insert', checkToken, UomInsert)
router.get('/view', checkToken, Uomview)
router.patch('/update', checkToken, UomUpdate)
module.exports = router