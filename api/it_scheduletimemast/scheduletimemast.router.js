const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { scheduleTimeInsert, getScheduleTime, ScheduleTimeUpdate, DropDownViewTime } = require('./scheduletimemast.controller');

router.post('/insert', checkToken, scheduleTimeInsert);
router.get('/select', checkToken, getScheduleTime);
router.patch('/update', checkToken, ScheduleTimeUpdate);
router.get('/list', checkToken, DropDownViewTime)
module.exports = router;