const router = require("express").Router();
const { getCampus, getBuilding, getBuildingBlock, getInsideBuildingBlock,getFloordropDown } = require('../rm_selectCompnents/select.controller');
router.get('/campusDropdown', getCampus)
router.get('/buildingDropdown', getBuilding)
router.get('/buildingBlockDropdown', getBuildingBlock)
router.get('/insideBuildingBlockDropdown', getInsideBuildingBlock)
router.get('/floordropDown',getFloordropDown)
module.exports = router;