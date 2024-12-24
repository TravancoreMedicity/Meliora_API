const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const {
    getallvehicledetail,
    createPractiseRegistration,
    searchVehicle,
    getTodayVehicles,
    getvehicleBetweenData,
    updatevehicleDetail,
    UploadImageSeparate,
    getAllVehicleReport
} = require('./mv_vehicle.controller')


router.get('/getallvehicledetail',checkToken,getallvehicledetail);
router.get('/getAllVehicleReport',checkToken,getAllVehicleReport);
//practise 
router.post('/createPracticeRegistraion',checkToken,createPractiseRegistration)
router.post('/searchVehicle',checkToken,searchVehicle);


router.post("/getTodayVehicles",checkToken,getTodayVehicles)
router.post("/getvehicleBetweenData",checkToken,getvehicleBetweenData)


router.patch('/updatevehicleDetail',checkToken,updatevehicleDetail);

router.post('/UploadImageSeparate',checkToken,UploadImageSeparate)



module.exports = router;
