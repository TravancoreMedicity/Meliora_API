const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const {insertAntibiotic, getAllAntibiotics,updateAntibiotic,getAntibioticPatientDetails,updatePatientDetails,getReportAntibioticPatients,getRestrictedAntibiotics,getAllAntibioticCount,
    getRestrictedAntibioticCount,gettotUnRestrictedAntibioticCount,gettotRestrictedAntibioticCount,getTotAntibiotics,getPatientAntibioticList,updatePatientAntibioticsPriority
} = require("./ams.controller");

router.post("/insert", checkToken, insertAntibiotic);
router.get("/getAntibiotics", checkToken, getAllAntibiotics);
router.patch("/update", checkToken, updateAntibiotic);
router.get("/getAntibioticPatientDetails", checkToken, getAntibioticPatientDetails);
router.patch("/updatePatientDetails", checkToken, updatePatientDetails);
router.post("/getReportAntibioticPatients", checkToken, getReportAntibioticPatients)
router.post("/getPatientAntibioticList", checkToken, getPatientAntibioticList)
router.patch("/updatePatientAntibioticsPriority", checkToken, updatePatientAntibioticsPriority);


//Dashboard
router.get("/getRestrictedAntibiotics", checkToken, getRestrictedAntibiotics);
router.post("/getAllAntibioticCount", checkToken, getAllAntibioticCount);
router.post("/getRestrictedAntibioticCount", checkToken, getRestrictedAntibioticCount);
router.post("/getTotUnRestrictedAntibioticCount", checkToken, gettotUnRestrictedAntibioticCount);
router.post("/getTotRestrictedAntibioticCount", checkToken, gettotRestrictedAntibioticCount);
router.post("/getTotAntibiotics", checkToken, getTotAntibiotics);




module.exports = router;
