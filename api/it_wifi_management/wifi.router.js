const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { WifiInsert, WifiUpdate, wifiViewById, checkCodeNdGet, updateQrCode, getAllowttedWiFi
} = require('../it_wifi_management/wifi.controller');


router.post('/insert', checkToken, WifiInsert)
router.patch('/update', checkToken, WifiUpdate)
router.get('/viewbyid/:id', checkToken, wifiViewById)

router.post('/checkCodeNdGet', checkToken, checkCodeNdGet)
router.patch('/updateQrCode', checkToken, updateQrCode)

router.get('/getAllowttedWiFi', checkToken, getAllowttedWiFi)


module.exports = router