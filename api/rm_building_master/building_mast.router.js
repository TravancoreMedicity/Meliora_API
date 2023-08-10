const router = require("express").Router();
const { BuildingInsert, BuildingView, BuildingUpdate } = require('../rm_building_master/building_mast.controller');



router.post('/insert', BuildingInsert)
router.get('/view', BuildingView)
router.patch('/update', BuildingUpdate)
module.exports = router