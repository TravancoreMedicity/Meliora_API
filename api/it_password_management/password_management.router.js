const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { PasswordInsert, PasswordView, PasswordUpdate } = require('../it_password_management/password_management.controller');

router.post('/insert', checkToken, PasswordInsert)
router.get('/view', checkToken, PasswordView)
router.patch('/update', checkToken, PasswordUpdate)
module.exports = router