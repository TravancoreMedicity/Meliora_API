const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { getItemDeliveryMark, updateprodetlstatus, getRoomByNSandDiet, getRoomByNSandDietAny, getRoomByNSandDietslno } = require('../diet_delivery_mark/deliverymark.controller');

const { requireMenuRight } = require("../../authentication/menuRights");
const { MENU_DIET_PROCESS } = require("../../authentication/menuNumbers");

router.get("/getType/:id", checkToken, getItemDeliveryMark)
router.patch('/status', checkToken, requireMenuRight(MENU_DIET_PROCESS), updateprodetlstatus)
router.post('/getRoom', checkToken, getRoomByNSandDiet)
router.post('/getRoom/nurse', checkToken, getRoomByNSandDietAny)
router.post('/getRoom/diet', checkToken, getRoomByNSandDietslno)
module.exports = router;