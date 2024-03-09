const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { crfRegistration, crfRegimageGet, crfDataCollection, getDataCollectionImage } = require('../crm_new_file_upload/crm_fileupload.controller')

router.post("/InsertRegisterImage", checkToken, crfRegistration)


router.get("/crfRegimageGet/:id", checkToken, crfRegimageGet)


router.post("/crf/DataCollection", checkToken, crfDataCollection)

router.post("/crf/getDataCollectionImage", checkToken, getDataCollectionImage)




module.exports = router;