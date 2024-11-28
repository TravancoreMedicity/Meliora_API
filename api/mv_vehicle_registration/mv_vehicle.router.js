const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const {createnewRegistration,vehicleImageUpload,PatmentImageUpload} = require('./mv_vehicle.controller')


router.post("/createnewregistration",checkToken,createnewRegistration)
router.post("/vehicleImageUpload",checkToken,vehicleImageUpload)
router.post("/PatmentImageUpload",checkToken,PatmentImageUpload)




module.exports = router;
