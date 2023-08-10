const router = require("express").Router();
const { AssetTypeInsert, AssetTypeView, AssetTypeUpdate } = require('../am_asset_type/am_asset_type.controller');

router.post('/insert', AssetTypeInsert)
router.get('/view', AssetTypeView)
router.patch('/update', AssetTypeUpdate)
module.exports = router