const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { BuildingInsert, BuildingView, BuildingUpdate } = require('../rm_building_master/building_mast.controller');



router.post('/insert', checkToken, BuildingInsert)
router.get('/view', checkToken, BuildingView)
router.patch('/update', checkToken, BuildingUpdate)
module.exports = router