const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { WifiInsert, WifiUpdate, wifiViewById, checkCodeNdGet, updateQrCode, getAllowttedWiFi, getCreatedDate,
    deleteQrCode, getExpiredWiFiDetails, getQrCodeLink
} = require('../it_wifi_management/wifi.controller');


router.post('/insert', checkToken, WifiInsert)
router.patch('/update', checkToken, WifiUpdate)
router.get('/viewbyid/:id', checkToken, wifiViewById)

router.post('/checkCodeNdGet', checkToken, checkCodeNdGet)
router.patch('/updateQrCode', checkToken, updateQrCode)

router.get('/getAllowttedWiFi', checkToken, getAllowttedWiFi)
router.get('/getDate/:id', checkToken, getCreatedDate)
router.patch('/delete', checkToken, deleteQrCode)
router.get('/expiredData/:id', checkToken, getExpiredWiFiDetails)

router.get('/getqrLink', checkToken, getQrCodeLink)

module.exports = router