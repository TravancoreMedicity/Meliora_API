const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { buildingInsert, getBuilding, updateBuilding, inactiveBuilding } = require('../rm_buildingmast/building.controller');

router.post("/", checkToken, buildingInsert);
router.get("/", checkToken, getBuilding);
router.patch("/", checkToken, updateBuilding);
router.patch("/inactive/:id", checkToken, inactiveBuilding);


module.exports = router;