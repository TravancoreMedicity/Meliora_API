const router = require("express").Router();
const { WifiInsert, WifiUpdate, wifiViewById } = require('../it_wifi_management/wifi.controller');


router.post('/insert', WifiInsert)
router.patch('/update', WifiUpdate)
router.get('/viewbyid/:id', wifiViewById)


module.exports = router