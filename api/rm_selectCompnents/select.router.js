const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getCampus, getBuilding, getBuildingBlock, getInsideBuildingBlock, getFloordropDown,
    getFloorBasedOnBuild, getRoomTypedropDown, getRoomCategorydropDown, getFloorBasedOnBuildAndBuildBlock } = require('../rm_selectCompnents/select.controller');
router.get('/campusDropdown', checkToken, getCampus)
router.get('/buildingDropdown', checkToken, getBuilding)
router.get('/buildingBlockDropdown', checkToken, getBuildingBlock)
router.get('/insideBuildingBlockDropdown', checkToken, getInsideBuildingBlock)
router.get('/floordropDown', checkToken, getFloordropDown)
router.post("/getFloorBasedOnBuild", checkToken, getFloorBasedOnBuild)
router.get('/roomTypedropDown', checkToken, getRoomTypedropDown)
router.get('/roomCategorydropDown', checkToken, getRoomCategorydropDown)
router.get('/getFloorBasedOnBuildAndBuildBlock', checkToken, getFloorBasedOnBuildAndBuildBlock)

module.exports = router;