const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { companyInsert, viewCompany, updateCompany, getActiveCompany, crfNotificationInsert, getCrfNotification, crfNotificationUpdate } = require('./company.controller');

router.post('/insert', checkToken, companyInsert)
router.post('/crfNotificationInsert', checkToken, crfNotificationInsert)
router.patch('/crfNotificationUpdate', checkToken, crfNotificationUpdate)
router.get('/getCrfNotification', checkToken, getCrfNotification)
router.get('/view', checkToken, viewCompany)
router.patch('/update', checkToken, updateCompany)
router.get('/active', checkToken, getActiveCompany)

module.exports = router