const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { TelemonthlyPaid, TeleQuarterPaid, TeleYearPaid, TeleOthrPaid, SoftwaremonthlyPaid, SoftwareQuarterlyPaid, SoftYearPaid, SoftOthrPaid, ServicemonthlyPaid,
    SerViceQuarterPaid, ServiceYearPaid, ServiceOthrPaid, getMonthlyTariffBillAmount, getQuarterlyTariffBillAmount, getYearlyTariffBillAmount, getOtherTariffBillAmount,
    getMonthlyTariffYear, getQuarterlyTariffYear, getYearlyTariffYear, getOtherTariffYear } = require('../it_bill_vieww/bill_view.controlller');

router.get('/telemonthlyPaid', checkToken, TelemonthlyPaid)
router.get('/teleQuarterPaid', checkToken, TeleQuarterPaid)
router.get('/teleYearPaid', checkToken, TeleYearPaid)
router.get('/teleOthrPaid', checkToken, TeleOthrPaid)

router.get('/softwaremonthlyPaid', checkToken, SoftwaremonthlyPaid)
router.get('/softwareQuarterlyPaid', checkToken, SoftwareQuarterlyPaid)
router.get('/softYearPaid', checkToken, SoftYearPaid)
router.get('/softOthrPaid', checkToken, SoftOthrPaid)

router.get('/servicemonthlyPaid', checkToken, ServicemonthlyPaid)
router.get('/serViceQuarterPaid', checkToken, SerViceQuarterPaid)
router.get('/serviceYearPaid', checkToken, ServiceYearPaid)
router.get('/serviceOthrPaid', checkToken, ServiceOthrPaid)

router.post('/getMonthlyTariffBillAmount', checkToken, getMonthlyTariffBillAmount)
router.post('/getQuarterlyTariffBillAmount', checkToken, getQuarterlyTariffBillAmount)
router.post('/getYearlyTariffBillAmount', checkToken, getYearlyTariffBillAmount)
router.post('/getOtherTariffBillAmount', checkToken, getOtherTariffBillAmount)

router.post('/getMonthlyTariffYear', checkToken, getMonthlyTariffYear)
router.post('/getQuarterlyTariffYear', checkToken, getQuarterlyTariffYear)
router.post('/getYearlyTariffYear', checkToken, getYearlyTariffYear)
router.post('/getOtherTariffYear', checkToken, getOtherTariffYear)


module.exports = router