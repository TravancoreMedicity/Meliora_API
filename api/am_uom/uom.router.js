const router = require("express").Router();
const { UomInsert, Uomview, UomUpdate } = require('../am_uom/uom.controller');

router.post('/insert', UomInsert)
router.get('/view', Uomview)
router.patch('/update', UomUpdate)
module.exports = router