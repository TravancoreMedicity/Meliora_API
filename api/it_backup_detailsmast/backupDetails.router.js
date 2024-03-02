const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { backupDetailsInsert,
    getBackupDetails,
    backupTypeUpdate,
    scheduleTimeInsert,
    ScheduleTimeInactive,
    SelectedDaysInsert,
    SelectedDaysUpdate,
    backupDailyInsert,
    DailyDetailsDelete,
    MonthlyDetailsDelete,
    WeekDetailsDelete,
    YearDetailsDelete,
    SelectedDaysDelete
} = require('./backupDetails.controller');
router.post('/insertMast', checkToken, backupDetailsInsert);
router.post('/detailInsert', checkToken, scheduleTimeInsert);
router.get('/select', checkToken, getBackupDetails);
router.patch('/updateMast', checkToken, backupTypeUpdate);
router.patch('/inactive', checkToken, ScheduleTimeInactive);
router.post('/add', checkToken, SelectedDaysInsert);
router.patch('/updatedays', checkToken, SelectedDaysUpdate);
router.post('/daydetails', checkToken, backupDailyInsert);
router.post('/daydelete', checkToken, DailyDetailsDelete);
router.post('/monthdelete', checkToken, MonthlyDetailsDelete);
router.post('/weekdelete', checkToken, WeekDetailsDelete);
router.post('/yeardelete', checkToken, YearDetailsDelete);
router.post('/seldaysdelete', checkToken, SelectedDaysDelete);
module.exports = router;