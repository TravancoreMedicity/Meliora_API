const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getinpatientList, insertpatientsurv, InsertDailyActivity, getsurvslno,
    Insertsrvtable, getsurvslnointraction, getsurvslnoonly, getAsignedStaff,
    getdailyactivity, getintraction, updateActivity, updateIntraction, getwedetail, selectsurvslno,
    updateweDetail, selectsurlogslno } = require('../WeWork/WeWork.controller')


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
router.get('/patdetail/:id', checkToken, getwedetail);
router.patch('/patchsurv', checkToken, updateweDetail)
router.post('/survslno', checkToken, selectsurvslno);
router.post('/logslno', checkToken, selectsurlogslno)


module.exports = router;