const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { uploadFileTask, getTaskFile, } = require('../tm_task_file_upload/task_file_upload.controller')



router.post("/uploadFile/task", checkToken, uploadFileTask)
router.get("/uploadFile/getTaskFile/:id", getTaskFile)


module.exports = router;
