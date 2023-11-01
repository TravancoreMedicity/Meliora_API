const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { MonthlyTarrifView, MonthlyTarrifUpdate, QuaterlyTarrifView, YearlyTarrifView,
    MonthlyTarrifInsert, QuaterlyTarrifInsert, CheckInsetQuaterlyOrNot, BillQuaterlyUpdate,
    YearlyTarrifInsert, CheckInsetMonthlyOrNot, BillMonthlyUpdate, CheckInsetYearlyOrNot,
    BillYearlyUpdate, getMonthData, getQuaterlyData, getYearData } = require('../it_tarrif/tarriffDetails.Controller');

router.get('/monthlyview', checkToken, MonthlyTarrifView)
router.get('/quaterlyview', checkToken, QuaterlyTarrifView)
router.get('/yearlyview', checkToken, YearlyTarrifView)
router.patch('/update', checkToken, MonthlyTarrifUpdate)

router.patch('/updateMonthlybillModal', checkToken, BillMonthlyUpdate)
router.post('/CheckInsetMonthlyOrNot', checkToken, CheckInsetMonthlyOrNot)
router.post('/monthlyTarrifInsert', checkToken, MonthlyTarrifInsert)
router.post('/getMonthData', checkToken, getMonthData)

router.patch('/updateQuaterlybillModal', checkToken, BillQuaterlyUpdate)
router.post('/CheckInsetQuaterlyOrNot', checkToken, CheckInsetQuaterlyOrNot)
router.post('/quaterlyTarrifInsert', checkToken, QuaterlyTarrifInsert)
router.post('/getQuaterlyData', checkToken, getQuaterlyData)

router.patch('/updateYearlybillModal', checkToken, BillYearlyUpdate)
router.post('/CheckInsetYearlyOrNot', checkToken, CheckInsetYearlyOrNot)
router.post('/yearlyTarrifInsert', checkToken, YearlyTarrifInsert)
router.post('/getYearlyData', checkToken, getYearData)

module.exports = router