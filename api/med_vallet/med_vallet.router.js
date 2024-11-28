const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const {createZonemaster,getAllZoneMaster,updatezonemaster,deleteZoneMaster,createUserMaster,getAlluserMaster,updataUserMaster,createslotmaster,getAllSlotMaster,updateslotmaster}  = require("../med_vallet/med_vallet.controller")


//zone master
router.post("/createzonemaster", checkToken, createZonemaster);
router.get("/getAllzoneMaster",checkToken,getAllZoneMaster)
router.patch("/updatezonemaster",checkToken,updatezonemaster)
// router.patch("/changestatus",checkToken,deleteZoneMaster) unneccessary route for deleting

//user master
router.post('/createusermaster',checkToken,createUserMaster)
router.get('/getAlluserMaster',checkToken,getAlluserMaster)
router.patch('/updatausermaster',checkToken,updataUserMaster)



//slot master
router.post('/createslotmaster',checkToken,createslotmaster)
router.get('/getAllSlotMaster',checkToken,getAllSlotMaster)
router.patch('/updateslotmaster',checkToken,updateslotmaster)

module.exports = router;