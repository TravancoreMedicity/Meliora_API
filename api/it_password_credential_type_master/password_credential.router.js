const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { CredentialInsert, CredentialView, CredentialUpdate } = require('../it_password_credential_type_master/password_credential.controller');

router.post('/insert', checkToken, CredentialInsert)
router.get('/view', checkToken, CredentialView)
router.patch('/update', checkToken, CredentialUpdate)
module.exports = router