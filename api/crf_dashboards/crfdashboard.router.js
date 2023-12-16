const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getDashClinicalCRF, getDashNonClinicalCRF, getDashClinicalNDRF, getDashNonClinicalNDRF } = require("../crf_dashboards/crfdashboard.controller");

router.get("/getDashClinicalCRF", checkToken, getDashClinicalCRF);
router.get("/getDashNonClinicalCRF", checkToken, getDashNonClinicalCRF);

router.get("/getDashClinicalNDRF", checkToken, getDashClinicalNDRF);
router.get("/getDashNonClinicalNDRF", checkToken, getDashNonClinicalNDRF);

module.exports = router;