const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { backupDetailsInsert,
    getBackupDetails,
    backupTypeUpdate,
    scheduleTimeInsert,
    ScheduleTimeInactive,
    SelectedDaysInsert,
    SelectedDaysUpdate } = require('./backupDetails.controller');
router.post('/insertMast', checkToken, backupDetailsInsert);
router.post('/detailInsert', checkToken, scheduleTimeInsert);
router.get('/select', checkToken, getBackupDetails);
router.patch('/updateMast', checkToken, backupTypeUpdate);
router.patch('/inactive', checkToken, ScheduleTimeInactive);
router.post('/add', checkToken, SelectedDaysInsert);
router.patch('/updatedays', checkToken, SelectedDaysUpdate);
module.exports = router;