const { checkToken } = require('../../authentication/token_validation');
const { stampActor } = require('../../authentication/userChecks');

const {
    insertPatientDietPlan,
    getAllPatientDietPlan,
    updatePatientDietPlan,
    getDieticians,
    StopCurrentPlan,
    getAllTemplateDetail,
    getAllDietProcessList,
    FetchAllActivePatient,
    getAllActiveDietPatient,
    getCurrentTemplateFood,
    fetchAllPatientMealType,
    getTemplateFoodStatus,
    getEmployeeNsStation,
    getConsultationRequired,
    AssingDieticain,
    DieticanStatus,
    getAllActiveNursingStation,
    getPatientActiveDietHistory,
    getPatientFullDetail,
    getPlanRemarksDetails,
    getTotalIpPatientList,
    getNewIpAdmissionDetails
} = require('./patientdietplan.controller');

const router = require('express').Router();

// "who did it" fields are set from the logged-in employee (stampActor), not taken from the request
router.post("/insert", checkToken, stampActor('created_by'), insertPatientDietPlan);
router.post("/getall", checkToken, getAllPatientDietPlan);
router.patch("/update", checkToken, stampActor('updated_by'), updatePatientDietPlan);
router.get("/getdietecian", checkToken, getDieticians);
router.patch("/update-status", checkToken, stampActor('updated_by'), StopCurrentPlan);


router.post("/getprocesslist", checkToken, getAllDietProcessList)

router.post("/fetchallactivepatient", checkToken, FetchAllActivePatient); // maybe not reqiyied
router.post("/ptmeal-type", checkToken, fetchAllPatientMealType); // maybe not reqiyied

router.post("/gettemplatedtl", checkToken, getAllTemplateDetail);

router.post("/gettodaytemplatedtl", checkToken, getCurrentTemplateFood);

router.post("/activepatient", checkToken, getAllActiveDietPatient);

router.post('/gettemplatefoodstatus', checkToken, getTemplateFoodStatus)
router.post('/get-emp-nsstation', checkToken, getEmployeeNsStation)


router.get('/get-consultation', checkToken, getConsultationRequired);

router.post(
    "/assign-dietician",
    checkToken,
    stampActor('assigned_by'),      // assigned_to (the dietician) stays as chosen
    AssingDieticain
);

router.post(
    "/diet-status",
    checkToken,
    DieticanStatus
);

router.post("/activenspatient", checkToken, getAllActiveNursingStation);

router.post("/diethistory", checkToken, getPatientActiveDietHistory);

router.post("/patientdtl", checkToken, getPatientFullDetail);

router.get("/plan-remarks/:plan_id", checkToken, getPlanRemarksDetails);

router.get('/total-ip-patient', checkToken, getTotalIpPatientList)

router.get('/new-admission', checkToken, getNewIpAdmissionDetails)




module.exports = router;