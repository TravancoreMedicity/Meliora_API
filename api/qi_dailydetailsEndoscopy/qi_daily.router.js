const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");

const { EndoscopyQiInsert, getPatientList, EndoDetailsAlreadyInsert, EndoscopyPatientUpdate,
    getEndoscopyPatientList, EndoscopyQiUpdate, getLastUpdatedDate, UpdateLastImportedDate } = require('./qi_daily.controller');
router.post('/save', checkToken, EndoscopyQiInsert);
router.post('/exist', checkToken, EndoDetailsAlreadyInsert);
router.post('/viewList', checkToken, getPatientList);
router.patch('/update', checkToken, EndoscopyPatientUpdate);
router.post('/view', checkToken, getEndoscopyPatientList);
router.patch('/qiupdate', checkToken, EndoscopyQiUpdate);
router.get('/getlast/:id', checkToken, getLastUpdatedDate);
router.patch('/dateupdate', checkToken, UpdateLastImportedDate);

module.exports = router;