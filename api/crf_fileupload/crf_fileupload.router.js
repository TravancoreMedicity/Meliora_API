const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { crfRegistration, crfRegimageGet, crfDataCollection, getDataCollectionImage } = require('../crf_fileupload/crf_fileupload.controller')

router.post("/crfRegistration", checkToken, crfRegistration)

router.get("/crfRegimageGet/:id", checkToken, crfRegimageGet)


router.post("/crf/DataCollection", checkToken, crfDataCollection)

router.post("/crf/getDataCollectionImage", checkToken, getDataCollectionImage)





module.exports = router;