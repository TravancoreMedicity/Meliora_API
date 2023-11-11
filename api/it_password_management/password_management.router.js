const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getAssetData, PasswordMasterInsert, PasswordMasterView, PasswordDetailInsert, PasswordDetailviewByid,
    PasswordMasterUpdate, PasswordDetailUpdate, PasswordSoftwareInsert,
    PasswordSoftwareView, PasswordSoftwareUpdate } = require('../it_password_management/password_management.controller');

router.post('/getAssetNo', checkToken, getAssetData)


router.post('/insertMast', checkToken, PasswordMasterInsert)
router.get('/masterView', checkToken, PasswordMasterView)
router.patch('/updateMast', checkToken, PasswordMasterUpdate)


router.post('/insertDetail', checkToken, PasswordDetailInsert)
router.get('/viewDetailByid/:id', checkToken, PasswordDetailviewByid)
router.patch('/updateDetail', checkToken, PasswordDetailUpdate)


router.post('/insertSoftware', checkToken, PasswordSoftwareInsert)
router.get('/SoftwareView', checkToken, PasswordSoftwareView)
router.patch('/updateSw', checkToken, PasswordSoftwareUpdate)


module.exports = router