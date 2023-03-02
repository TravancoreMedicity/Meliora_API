const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { uploadFile } = require('../fileupload/fileupload.controller')


router.post("/uploadFile", uploadFile)

module.exports = router;