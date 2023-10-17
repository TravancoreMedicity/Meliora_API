const router = require("express").Router();
const { MonthlyTarrifView, MonthlyTarrifUpdate, QuaterlyTarrifView, YearlyTarrifView,
    MonthlyTarrifInsert, QuaterlyTarrifInsert, CheckInsetQuaterlyOrNot, BillQuaterlyUpdate,
    YearlyTarrifInsert, CheckInsetMonthlyOrNot, BillMonthlyUpdate, CheckInsetYearlyOrNot,
    BillYearlyUpdate } = require('../it_tarrif/tarriffDetails.Controller');

router.get('/monthlyview', MonthlyTarrifView)
router.get('/quaterlyview', QuaterlyTarrifView)
router.get('/yearlyview', YearlyTarrifView)
router.patch('/update', MonthlyTarrifUpdate)

router.patch('/updateMonthlybillModal', BillMonthlyUpdate)
router.post('/CheckInsetMonthlyOrNot', CheckInsetMonthlyOrNot)
router.post('/monthlyTarrifInsert', MonthlyTarrifInsert)

router.patch('/updateYearlybillModal', BillYearlyUpdate)
router.post('/CheckInsetYearlyOrNot', CheckInsetYearlyOrNot)
router.post('/yearlyTarrifInsert', YearlyTarrifInsert)

router.patch('/updateQuaterlybillModal', BillQuaterlyUpdate)
router.post('/CheckInsetQuaterlyOrNot', CheckInsetQuaterlyOrNot)
router.post('/quaterlyTarrifInsert', QuaterlyTarrifInsert)

module.exports = router