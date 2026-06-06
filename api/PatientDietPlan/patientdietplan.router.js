const { checkToken } = require('../../authentication/token_validation');

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
    DieticanStatus
} = require('./patientdietplan.controller');

const router = require('express').Router();

router.post("/insert", checkToken, insertPatientDietPlan);
router.post("/getall", checkToken, getAllPatientDietPlan);
router.patch("/update", checkToken, updatePatientDietPlan);
router.get("/getdietecian", checkToken, getDieticians);
router.patch("/update-status", checkToken, StopCurrentPlan);


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
    AssingDieticain
);

router.post(
    "/diet-status",
    DieticanStatus
);


module.exports = router;