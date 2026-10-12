const router = require('express').Router();
const { checkToken } = require('../../authentication/token_validation');
const { stampActor } = require('../../authentication/userChecks');

const {
    schedulePatientDietDetail,
    getAllScheduledPatient,
    updateScheduleStatus,
    cancelSchedule,
    deactivateSchedule,
    getPatientProcesssedFood,
    ServedSchedule
} = require('./patientdietscheduled.controller');

// "who did it" fields are set from the logged-in employee (stampActor), not taken from the request
router.post("/schedule/list", checkToken, stampActor('created_by'), schedulePatientDietDetail);
router.post("/getall/schedule", checkToken, getAllScheduledPatient);


router.post("/schedule/update/status", checkToken, stampActor('updated_by'), updateScheduleStatus);
router.post("/schedule/cancel", checkToken, stampActor('cancelled_by', 'updated_by'), cancelSchedule);
router.post("/schedule/deactivate", checkToken, stampActor('updated_by'), deactivateSchedule);
router.post("/schedule/serve", checkToken, stampActor('updated_by'), ServedSchedule);

router.post('/schedule/processfood',checkToken,getPatientProcesssedFood)





module.exports = router;