const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const {NotificationInsert  ,NotificationView,NotificationUpdate} = require('./notification.controller');

router.post('/insert', checkToken, NotificationInsert)
router.get('/view', checkToken, NotificationView)
router.patch('/update', checkToken, NotificationUpdate)

module.exports = router;