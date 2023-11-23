const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { floorDashgetById, RoomDashgetById, FloorNDroomById, getSubRoom, getRoomAsset
} = require('../rm_dashboard/dashboard.controller');
router.get('/getfloorbsedoncampus/:id', checkToken, floorDashgetById)
router.get('/byid/:id', checkToken, RoomDashgetById)
router.get('/frbyid/:id', checkToken, FloorNDroomById)
router.get('/getSubRoom/:id', checkToken, getSubRoom)
router.get('/getRoomAsset/:id', checkToken, getRoomAsset)
module.exports = router