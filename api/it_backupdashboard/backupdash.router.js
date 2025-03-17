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
router.get('/select/:id', checkToken, getSelectedDaysBackup);
router.get('/days/:id', checkToken, getSelectedDays);
router.get('/exist', checkToken, DaysAlreadyExist);
router.post('/add', checkToken, SelectedDaysInsert);
router.post('/altdaysverified', checkToken, getSelectedDaysVerified);

router.get('/selectdaily/:id', checkToken, getDailyBackup);
router.get('/lastday', checkToken, getLastDayOfBackup);
router.post('/insertdaily', checkToken, backupDailyInsert);
router.get('/daydetails/:id', checkToken, getDailyDetailsForVerification);
router.post('/dayverified', checkToken, getDailyVerifiedDetails);

router.get('/weekly/:id', checkToken, getWeeklyBackup);
router.post('/insertweek', checkToken, backupWeeklyInsert);
router.get('/weeklydetails/:id', checkToken, getWeeklyDetails);
router.post('/weekverified', checkToken, getWeeklyVerifiedDetails);

router.get('/monthly/:id', checkToken, getMonthlyBackup);
router.post('/insertmonthly', checkToken, backupMonthlyInsert);
router.get('/monthdetails/:id', checkToken, getMonthlyDetailsForVerification);
router.post('/monthverified', checkToken, getMonthVerified);

router.get('/yearly/:id', checkToken, getYearlyBackup);
router.post('/insertyearly', checkToken, backupYearlyInsert);
router.get('/yeardetails/:id', checkToken, getYearlyDetailsForVerification);
router.post('/yearverified', checkToken, getYearVerified);
module.exports = router;