const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getCRFNoBased, getdataUserAcknldged, getdataUserNotAcknldged, getdataAllCRF,
    getPurchaseCRFData
} = require('../crm_reports/crm_report.controller');

router.get("/getCRFNoBased/:id", checkToken, getCRFNoBased);
router.post('/getdataUserAcknldged', checkToken, getdataUserAcknldged);
router.post('/getdataUserNotAcknldged', checkToken, getdataUserNotAcknldged);
router.post('/getdataAllCRF', checkToken, getdataAllCRF);
router.post('/getPurchaseCRFData', checkToken, getPurchaseCRFData);

module.exports = router;