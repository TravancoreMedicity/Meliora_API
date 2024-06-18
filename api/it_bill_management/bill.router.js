const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { BillInsert, AllBillView, UpdateBill, MonthlyTarrifInsert, MonthlyTarrifView, OtherBillinsert, OtherBillView, UpdateOtherBill, QuaterlyTarrifView,
    QuaterlyTarrifInsert, YearlyTarrifView, YearlyTarrifInsert, BillMonthlyUpdate, BillQuaterlyUpdate, BillYearlyUpdate, OtherBillViewDash, otherTeleBillViewinDash,
    otherSoftwareBillViewinDash, otherServiceBillViewinDash, getbilltype, checkMonthlyInsert, getUnpaidMonthlyTeleBills, checkQuarterlyInsert, checkYearlyInsert,
    getUnpaidQuarterlyTeleBills, getUnpaidYearlyTeleBills, getUnpaidMonthlySoftBills, getUnpaidQuarterlySoftBills, getUnpaidYearlySoftBills,
    getAssetDetails } = require('../it_bill_management/bill.controller');

router.get('/getbilltype/:id', checkToken, getbilltype)
router.post('/insertBill', checkToken, BillInsert)
router.get('/allBillView', checkToken, AllBillView)
router.patch('/updateBill', checkToken, UpdateBill)
router.post('/otherBillinsert', checkToken, OtherBillinsert)
router.get('/otherBillView', checkToken, OtherBillView)
router.patch('/UpdateOtherBill', checkToken, UpdateOtherBill)
router.get('/otherBillViewinDash', checkToken, OtherBillViewDash)

router.get('/monthlyview', checkToken, MonthlyTarrifView)
router.get('/checkMonthlyInsert/:id', checkToken, checkMonthlyInsert)
router.post('/monthlyTarrifInsert', checkToken, MonthlyTarrifInsert)
router.patch('/updateMonthlybill', checkToken, BillMonthlyUpdate)

router.get('/quarterlyview', checkToken, QuaterlyTarrifView)
router.get('/checkQuarterlyInsert/:id', checkToken, checkQuarterlyInsert)
router.post('/quaterlyTarrifInsert', checkToken, QuaterlyTarrifInsert)
router.patch('/updateQuaterlybillModal', checkToken, BillQuaterlyUpdate)

router.get('/yearlyview', checkToken, YearlyTarrifView)
router.get('/checkYearlyInsert/:id', checkToken, checkYearlyInsert)
router.post('/yearlyTarrifInsert', checkToken, YearlyTarrifInsert)
router.patch('/updateYearlybillModal', checkToken, BillYearlyUpdate)

router.get('/getUnpaidMonthlyTeleBills', checkToken, getUnpaidMonthlyTeleBills)
router.get('/getUnpaidQuarterlyTeleBills', checkToken, getUnpaidQuarterlyTeleBills)
router.get('/getUnpaidYearlyTeleBills', checkToken, getUnpaidYearlyTeleBills)
router.get('/otherTeleBillViewinDash', checkToken, otherTeleBillViewinDash)

router.get('/getUnpaidMonthlySoftBills', checkToken, getUnpaidMonthlySoftBills)
router.get('/getUnpaidQuarterlySoftBills', checkToken, getUnpaidQuarterlySoftBills)
router.get('/getUnpaidYearlySoftBills', checkToken, getUnpaidYearlySoftBills)
router.get('/otherSoftwareBillViewinDash', checkToken, otherSoftwareBillViewinDash)

router.get('/otherServiceBillViewinDash', checkToken, otherServiceBillViewinDash)
router.get('/getAssetDetails/:id', checkToken, getAssetDetails)

module.exports = router