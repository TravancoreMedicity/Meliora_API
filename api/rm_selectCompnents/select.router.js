const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getCampus, getBuilding, getBuildingBlock, getInsideBuildingBlock, getFloordropDown,
    getFloorBasedOnBuild, getRoomTypedropDown, getRoomCategorydropDown, getFloorBasedOnBuildAndBuildBlock } = require('../rm_selectCompnents/select.controller');
router.get('/campusDropdown', getCampus)
router.get('/buildingDropdown', getBuilding)
router.get('/buildingBlockDropdown', getBuildingBlock)
router.get('/insideBuildingBlockDropdown', getInsideBuildingBlock)
router.get('/floordropDown', getFloordropDown)
router.post("/getFloorBasedOnBuild", checkToken, getFloorBasedOnBuild)
router.get('/roomTypedropDown', getRoomTypedropDown)
router.get('/roomCategorydropDown', getRoomCategorydropDown)
router.get('/getFloorBasedOnBuildAndBuildBlock', getFloorBasedOnBuildAndBuildBlock)

module.exports = router;