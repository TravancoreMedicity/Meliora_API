const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { getItemDeliveryMark, updateprodetlstatus, getRoomByNSandDiet, getRoomByNSandDietAny, getRoomByNSandDietslno } = require('../diet_delivery_mark/deliverymark.controller');

router.get("/getType/:id", checkToken, getItemDeliveryMark)
router.patch('/status', checkToken, updateprodetlstatus)
router.post('/getRoom', checkToken, getRoomByNSandDiet)
router.post('/getRoom/nurse', checkToken, getRoomByNSandDietAny)
router.post('/getRoom/diet', checkToken, getRoomByNSandDietslno)
module.exports = router;