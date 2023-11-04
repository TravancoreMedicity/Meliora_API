const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { crfRegistration, crfRegimageGet } = require('../crf_fileupload/crf_fileupload.controller')

router.post("/crfRegistration", checkToken, crfRegistration)

router.get("/crfRegimageGet/:id", checkToken, crfRegimageGet)


module.exports = router;