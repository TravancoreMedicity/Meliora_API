const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { AssetRackInsert, AssetRackView, AssetRackUpdate } = require('../am_rack_master/am_rack.controller')

router.post('/insert', checkToken, AssetRackInsert)
router.get('/view', checkToken, AssetRackView)
router.patch('/update', checkToken, AssetRackUpdate)
module.exports = router