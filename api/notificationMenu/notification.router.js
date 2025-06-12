const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const {NotificationInsert  ,NotificationView,NotificationUpdate,getActiveNotifications} = require('./notification.controller');

router.post('/insert', checkToken, NotificationInsert)
router.get('/view', checkToken, NotificationView)
router.patch('/update', checkToken, NotificationUpdate)

router.get("/getActiveNotifications", checkToken, getActiveNotifications);

module.exports = router;