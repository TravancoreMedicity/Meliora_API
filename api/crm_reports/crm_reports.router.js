const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getCRFNoBased, getdataUserAcknldged, getdataUserNotAcknldged, getdataAllCRF,
    getPurchaseCRFData, getPurchaseDetails, getPOdetailStores, getdataAllCRFWithPO
} = require('../crm_reports/crm_report.controller');

router.get("/getCRFNoBased/:id", checkToken, getCRFNoBased);
router.post('/getdataUserAcknldged', checkToken, getdataUserAcknldged);
router.post('/getdataUserNotAcknldged', checkToken, getdataUserNotAcknldged);
router.post('/getdataAllCRF', checkToken, getdataAllCRF);
router.post('/getPurchaseCRFData', checkToken, getPurchaseCRFData);
router.get("/getPurchaseDetails/:id", checkToken, getPurchaseDetails);
router.get("/getPOdetailStores/:id", checkToken, getPOdetailStores);
router.post('/getdataAllCRFWithPO', checkToken, getdataAllCRFWithPO);

module.exports = router;