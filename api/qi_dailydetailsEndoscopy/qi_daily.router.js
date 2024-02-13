const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");

const {
    EndoscopyQiInsert,
    EndoscopyAlreadyExist,
    EndoscopyQiUpdate,
    getQualityInicatorList,
    getQIReportEndoscopy } = require('./qi_daily.controller');
router.post('/savedata', checkToken, EndoscopyQiInsert);
router.get('/exist/:id', checkToken, EndoscopyAlreadyExist);
router.patch('/update', checkToken, EndoscopyQiUpdate);
router.get('/getqi/:id', checkToken, getQualityInicatorList);
router.post('/endoReport', checkToken, getQIReportEndoscopy);

module.exports = router;