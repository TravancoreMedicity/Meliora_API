const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getDashClinicalCRF, getDashNonClinicalCRF, getDashClinicalNDRF, getDashNonClinicalNDRF,
    updateDMSApproval, updateMSApproval, updateOMApproval,
    updateSOMpproval, updateCEOApproval, } = require("../crf_dashboards/crfdashboard.controller");

router.get("/getDashClinicalCRF", checkToken, getDashClinicalCRF);
router.get("/getDashNonClinicalCRF", checkToken, getDashNonClinicalCRF);

router.get("/getDashClinicalNDRF", checkToken, getDashClinicalNDRF);
router.get("/getDashNonClinicalNDRF", checkToken, getDashNonClinicalNDRF);

router.patch("/approval/dms", checkToken, updateDMSApproval);
router.patch("/approval/ms", checkToken, updateMSApproval);
router.patch("/approval/om", checkToken, updateOMApproval);
router.patch("/approval/som", checkToken, updateSOMpproval);
router.patch("/approval/ceo", checkToken, updateCEOApproval);



module.exports = router;