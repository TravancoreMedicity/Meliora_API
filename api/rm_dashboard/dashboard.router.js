const router = require("express").Router();
const { floorDashgetById, RoomDashgetById, FloorNDroomById } = require('../rm_dashboard/dashboard.controller');
router.get('/getfloorbsedoncampus/:id', floorDashgetById)
router.get('/byid/:id', RoomDashgetById)
router.get('/frbyid/:id', FloorNDroomById)


module.exports = router