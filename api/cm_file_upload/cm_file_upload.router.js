const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { uploadFilecomplaint, getComplaintFile, } = require('./cm_file_upload.controller')



router.post("/uploadFile/Complaint", checkToken, uploadFilecomplaint)
router.get("/uploadFile/getComplaintFile/:id", getComplaintFile)


module.exports = router;