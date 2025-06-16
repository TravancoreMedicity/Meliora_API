const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const {
    DailyCensusInsert,
    DailyCensusAlreadyExist,
    DailyCensusYesterdayCount,
    GetDailyCensusReport,
    DailyCensusUpdate,
    GetCensusBargraphReport,
    ElliderDataUpdate, GetDailyCensusReportView
} = require('./daily_census.controller');
router.post('/save', checkToken, DailyCensusInsert);
router.post('/exist', checkToken, DailyCensusAlreadyExist);
router.post('/yesterday', checkToken, DailyCensusYesterdayCount);
router.post('/view', checkToken, GetDailyCensusReport);
router.patch('/update', checkToken, DailyCensusUpdate);
router.post('/viewgraph', checkToken, GetCensusBargraphReport);
router.patch('/hisupdate', checkToken, ElliderDataUpdate);
router.post('/viewReport', checkToken, GetDailyCensusReportView);

module.exports = router;