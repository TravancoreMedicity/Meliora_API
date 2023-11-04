const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { scheduleTypeInsert, getScheduleType, ScheduleTypeUpdate, DropDownViewType } = require('./scheduletype.controller');
router.post('/insert', checkToken, scheduleTypeInsert);
router.get('/select', checkToken, getScheduleType);
router.patch('/update', checkToken, ScheduleTypeUpdate);
router.get('/list', checkToken, DropDownViewType)
module.exports = router;