const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { uploadFileAssetService, getAssetServiceFile, } = require('./service_file_upload.controller')



router.post("/uploadFile/UploadAssetService", checkToken, uploadFileAssetService)
router.get("/uploadFile/getAssetServiceFile/:id", getAssetServiceFile)


module.exports = router;