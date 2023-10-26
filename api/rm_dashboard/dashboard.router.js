const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { floorDashgetById, RoomDashgetById, FloorNDroomById } = require('../rm_dashboard/dashboard.controller');
router.get('/getfloorbsedoncampus/:id', checkToken, floorDashgetById)
router.get('/byid/:id', checkToken, RoomDashgetById)
router.get('/frbyid/:id', checkToken, FloorNDroomById)


module.exports = router