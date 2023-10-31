const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const {
    getSelectedDaysBackup,
    getSelectedDays,
    DaysAlreadyExist,
    SelectedDaysInsert,
    getSelectedDaysVerified,
    getDailyBackup,
    getLastDayOfBackup,
    backupDailyInsert,
    getDailyDetailsForVerification,
    getDailyVerifiedDetails,
    getMonthlyBackup,
    backupMonthlyInsert,
    getMonthlyDetailsForVerification,
    getMonthVerified,
    getYearlyBackup,
    backupYearlyInsert,
    getYearlyDetailsForVerification,
    getYearVerified,
    getWeeklyBackup,
    backupWeeklyInsert,
    getWeeklyDetails,
    getWeeklyVerifiedDetails
} = require('./backupdash.controller');
router.get('/select', checkToken, getSelectedDaysBackup);
router.get('/days', checkToken, getSelectedDays);
router.get('/exist', checkToken, DaysAlreadyExist);
router.post('/add', checkToken, SelectedDaysInsert);
router.get('/altdaysverified', checkToken, getSelectedDaysVerified);
router.get('/selectdaily', checkToken, getDailyBackup);
router.get('/lastday', checkToken, getLastDayOfBackup);
router.post('/insertdaily', checkToken, backupDailyInsert);
router.get('/daydetails', checkToken, getDailyDetailsForVerification);
router.get('/dayverified', checkToken, getDailyVerifiedDetails);
router.get('/weekly', checkToken, getWeeklyBackup);
router.post('/insertweek', checkToken, backupWeeklyInsert);
router.get('/weeklydetails', checkToken, getWeeklyDetails);
router.get('/weekverified', checkToken, getWeeklyVerifiedDetails);
router.get('/monthly', checkToken, getMonthlyBackup);
router.post('/insertmonthly', checkToken, backupMonthlyInsert);
router.get('/monthdetails', checkToken, getMonthlyDetailsForVerification);
router.get('/monthverified', checkToken, getMonthVerified);
router.get('/yearly', checkToken, getYearlyBackup);
router.post('/insertyearly', checkToken, backupYearlyInsert);
router.get('/yeardetails', checkToken, getYearlyDetailsForVerification);
router.get('/yearverified', checkToken, getYearVerified);
module.exports = router;