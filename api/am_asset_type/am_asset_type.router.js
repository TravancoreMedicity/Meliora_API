const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { AssetTypeInsert, AssetTypeView, AssetTypeUpdate } = require('../am_asset_type/am_asset_type.controller');

router.post('/insert', checkToken, AssetTypeInsert)
router.get('/view', checkToken, AssetTypeView)
router.patch('/update', checkToken, AssetTypeUpdate)
module.exports = router