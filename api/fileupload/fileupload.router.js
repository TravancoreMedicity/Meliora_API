const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { uploadFileModel, uploadFilesubModel } = require('../fileupload/fileupload.controller')


// router.post("/uploadFile", uploadFile)
router.post("/uploadFile/Model", uploadFileModel)
router.post("/uploadFile/subModel", uploadFilesubModel)
module.exports = router;