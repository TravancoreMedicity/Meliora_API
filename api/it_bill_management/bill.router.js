const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { BillInsert, AllBillView, UpdateBill, CheckInsetMonthlyOrNot, MonthlyTarrifInsert, MonthlyTarrifView, getMonthData, OtherBillinsert, OtherBillView, UpdateOtherBill,
    QuaterlyTarrifView, CheckInsetQuaterlyOrNot, QuaterlyTarrifInsert, getQuaterlyData, YearlyTarrifView, CheckInsetYearlyOrNot, YearlyTarrifInsert, getYearData,
    BillMonthlyUpdate, BillQuaterlyUpdate, BillYearlyUpdate, OtherBillViewDash, getTeleMonthData, getTeleQuarterlyData, getTeleYearlyData, otherTeleBillViewinDash,
    getSoftwareMonthData, getSoftwareQuaterlyData, getSoftwareYearlyData, otherSoftwareBillViewinDash, getServiceMonthData, getServiceQuarterlyData, getServiceYearlyData,
    otherServiceBillViewinDash, getbilltype } = require('../it_bill_management/bill.controller');

router.post('/insertBill', checkToken, BillInsert)
router.get('/allBillView', checkToken, AllBillView)
router.patch('/updateBill', checkToken, UpdateBill)

router.post('/otherBillinsert', checkToken, OtherBillinsert)
router.get('/otherBillView', checkToken, OtherBillView)
router.patch('/UpdateOtherBill', checkToken, UpdateOtherBill)

router.get('/monthlyview', checkToken, MonthlyTarrifView)
router.post('/CheckInsetMonthlyOrNot', checkToken, CheckInsetMonthlyOrNot)
router.post('/monthlyTarrifInsert', checkToken, MonthlyTarrifInsert)
router.post('/getMonthData', checkToken, getMonthData)
router.patch('/updateMonthlybill', checkToken, BillMonthlyUpdate)

router.get('/quarterlyview', checkToken, QuaterlyTarrifView)
router.post('/CheckInsetQuaterlyOrNot', checkToken, CheckInsetQuaterlyOrNot)
router.post('/quaterlyTarrifInsert', checkToken, QuaterlyTarrifInsert)
router.post('/getQuaterlyData', checkToken, getQuaterlyData)
router.patch('/updateQuaterlybillModal', checkToken, BillQuaterlyUpdate)

router.get('/yearlyview', checkToken, YearlyTarrifView)
router.post('/CheckInsetYearlyOrNot', checkToken, CheckInsetYearlyOrNot)
router.post('/yearlyTarrifInsert', checkToken, YearlyTarrifInsert)
router.post('/getYearlyData', checkToken, getYearData)
router.patch('/updateYearlybillModal', checkToken, BillYearlyUpdate)

router.get('/otherBillViewinDash', checkToken, OtherBillViewDash)
router.post('/getTeleMonthData', checkToken, getTeleMonthData)
router.post('/getTeleQuarterlyData', checkToken, getTeleQuarterlyData)
router.post('/getTeleYearlyData', checkToken, getTeleYearlyData)
router.get('/otherTeleBillViewinDash', checkToken, otherTeleBillViewinDash)

router.post('/getSoftwareMonthData', checkToken, getSoftwareMonthData)
router.post('/getSoftwareQuaterlyData', checkToken, getSoftwareQuaterlyData)
router.post('/getSoftwareYearlyData', checkToken, getSoftwareYearlyData)
router.get('/otherSoftwareBillViewinDash', checkToken, otherSoftwareBillViewinDash)

router.post('/getServiceMonthData', checkToken, getServiceMonthData)
router.post('/getServiceQuarterlyData', checkToken, getServiceQuarterlyData)
router.post('/getServiceYearlyData', checkToken, getServiceYearlyData)
router.get('/otherServiceBillViewinDash', checkToken, otherServiceBillViewinDash)

router.get('/getbilltype/:id', checkToken, getbilltype)

module.exports = router