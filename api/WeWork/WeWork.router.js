const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getinpatientList, insertpatientsurv, InsertDailyActivity, getsurvslno,
    Insertsrvtable, getsurvslnointraction, getsurvslnoonly, getAsignedStaff,
    getdailyactivity, getintraction, updateActivity, updateIntraction, getwedetail, selectsurvslno,
    updateweDetail, selectsurlogslno, getTotalAdmission, getDamalist, getBhrcList, getDocVisit,
    DischargeAfternoonList, getsruvillenceDetl, getOneSheetList, getAdmittebhrc } = require('../WeWork/WeWork.controller')


router.get('/getinpatient/:id', checkToken, getinpatientList);
router.post('/patientsurv', checkToken, insertpatientsurv);
router.post('/insertdaily', checkToken, InsertDailyActivity);
router.post('/getsurno/:id', checkToken, getsurvslno)
router.post('/insertsurv', checkToken, Insertsrvtable);
router.post('/intraction', checkToken, getsurvslnointraction);
router.get('/slnobyip/:id', checkToken, getsurvslnoonly);
router.get('/:id', checkToken, getAsignedStaff);
router.get('/activity/:id', checkToken, getdailyactivity);
router.get('/intraction/:id', checkToken, getintraction);
router.patch('/updateAct', checkToken, updateActivity);
router.patch('/patintraction', checkToken, updateIntraction);
router.post('/patdetail', checkToken, getwedetail);
router.patch('/patchsurv', checkToken, updateweDetail);
router.post('/survslno', checkToken, selectsurvslno);
router.post('/logslno', checkToken, selectsurlogslno);
router.get('/total/admission', checkToken, getTotalAdmission);
router.get('/get/DamaList', checkToken, getDamalist);
router.get('/get/bhrcList', checkToken, getBhrcList)
router.get('/get/visit', checkToken, getDocVisit)
router.get('/get/discharge', checkToken, DischargeAfternoonList)
router.get('/survdetl/:id', checkToken, getsruvillenceDetl)
router.get('/noshift/detl', checkToken, getOneSheetList)
router.get('/bhrc/admit', checkToken, getAdmittebhrc)

module.exports = router;