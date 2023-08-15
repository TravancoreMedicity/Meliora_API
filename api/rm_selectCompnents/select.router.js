const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getCampus, getBuilding, getBuildingBlock, getInsideBuildingBlock, getFloordropDown,
    getFloorBasedOnBuild, getRoomTypedropDown, getRoomCategorydropDown } = require('../rm_selectCompnents/select.controller');
router.get('/campusDropdown', getCampus)
router.get('/buildingDropdown', getBuilding)
router.get('/buildingBlockDropdown', getBuildingBlock)
router.get('/insideBuildingBlockDropdown', getInsideBuildingBlock)
router.get('/floordropDown', getFloordropDown)

router.get("/getFloorBasedOnBuild/:id", checkToken, getFloorBasedOnBuild)
router.get('/roomTypedropDown', getRoomTypedropDown)
router.get('/roomCategorydropDown', getRoomCategorydropDown)


module.exports = router;