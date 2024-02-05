const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { crfRegistration } = require('../crm_new_file_upload/crm_fileupload.controller')

router.post("/InsertRegisterImage", checkToken, crfRegistration)






module.exports = router;