const router = require('express').Router();
const { checkToken } = require('../../authentication/token_validation');

const {
    schedulePatientDietDetail,
    getAllScheduledPatient,
    updateScheduleStatus,
    cancelSchedule,
    deactivateSchedule,
    getPatientProcesssedFood
} = require('./patientdietscheduled.controller');

router.post("/schedule/list", checkToken, schedulePatientDietDetail);
router.post("/getall/schedule", checkToken, getAllScheduledPatient);


router.post("/schedule/update/status", checkToken, updateScheduleStatus);
router.post("/schedule/cancel", checkToken, cancelSchedule);
router.post("/schedule/deactivate", checkToken, deactivateSchedule);


router.post('/schedule/processfood',checkToken,getPatientProcesssedFood)





module.exports = router;