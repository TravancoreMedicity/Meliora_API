const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { floorInsert, getFloor, updateFloor, inactiveFloor, getBuild } = require('../rm_floormast/floor.controller');

router.post("/", checkToken, floorInsert);
router.get("/", checkToken, getFloor);
router.patch("/", checkToken, updateFloor);
router.patch("/inactive", checkToken, inactiveFloor);
router.get("/build", checkToken, getBuild);


module.exports = router;