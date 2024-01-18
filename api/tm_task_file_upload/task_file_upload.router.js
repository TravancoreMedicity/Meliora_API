const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { uploadFileTask, getTaskFile, uploadFileSubTask, getSubTaskFile } = require('../tm_task_file_upload/task_file_upload.controller')



router.post("/uploadFile/task", checkToken, uploadFileTask)
router.get("/uploadFile/getTaskFile/:id", getTaskFile)




router.post("/uploadFile/subtask", checkToken, uploadFileSubTask)
router.get("/uploadFile/getSubTaskFile/:id", getSubTaskFile)


module.exports = router;
