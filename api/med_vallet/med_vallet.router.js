const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { createZonemaster, getAllZoneMaster, updatezonemaster, deleteZoneMaster, createUserMaster, getAlluserMaster, updataUserMaster, createslotmaster, getAllSlotMaster, updateslotmaster, createuserRight, getAllUserRight, updateuserRight, getallPresentDriver, getdriverdropDown, getAllDriverUserRight, createnewCurrentDriver,
getAllAttendaceReport,
getTodayAttendaceReport,
getAttendaceBetweenDate,
getselectedEmployee,
getdriverDropdownReport
} = require("../med_vallet/med_vallet.controller")


//zone master
router.post("/createzonemaster", checkToken, createZonemaster);
router.get("/getAllzoneMaster", checkToken, getAllZoneMaster)
router.patch("/updatezonemaster", checkToken, updatezonemaster)
// router.patch("/changestatus",checkToken,deleteZoneMaster) unneccessary route for deleting

//user master
router.post('/createusermaster', checkToken, createUserMaster)
router.get('/getAlluserMaster', checkToken, getAlluserMaster)
router.patch('/updatausermaster', checkToken, updataUserMaster)



//slot master
router.post('/createslotmaster', checkToken, createslotmaster)
router.get('/getAllSlotMaster', checkToken, getAllSlotMaster)
router.patch('/updateslotmaster', checkToken, updateslotmaster)


//user rights
router.post('/createuserRight', checkToken, createuserRight)
router.get('/getAllUserRight', checkToken, getAllUserRight)
router.patch('/updateuserRight', checkToken, updateuserRight)


// router.post('/createcurrentDriver',checkToken,createcurrentDriver)
router.post('/createnewCurrentDriver', checkToken, createnewCurrentDriver)


router.post('/getallPresentDriver', checkToken, getallPresentDriver)
router.post('/getdriverdropdown', checkToken, getdriverdropDown)
router.get('/getdriverDropdownReport', checkToken, getdriverDropdownReport)

router.get('/getAllDriverUserRight', checkToken, getAllDriverUserRight)


router.get('/getAllAttendaceReport', checkToken, getAllAttendaceReport)
router.post('/getTodayAttendaceReport', checkToken, getTodayAttendaceReport)
router.post('/getAttendaceBetweenDate', checkToken, getAttendaceBetweenDate)
router.post('/getselectedEmployee', checkToken, getselectedEmployee)

module.exports = router;