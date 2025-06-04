const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { crfRegistration, crfRegimageGet, crfDataCollection, getDataCollectionImage,
    ImageInsertHOD, ImageInsertDMS, ImageInsertMS, ImageInsertMO, ImageInsertSMO,
    ImageInsertGM, ImageInsertMD, ImageInsertED, crfHodImageGet, crfDMSImageGet,
    crfMSImageGet, crfMOImageGet, crfSMOImageGet, crfGMImageGet, crfMDImageGet,
    crfEDImageGet, ImageInsertManaging, crfManageImageGet, ImageInsertMDKmch, crfKMCHMDImageGet, crfDeliveryMarking, crfDMimageGet
} = require('../crm_new_file_upload/crm_fileupload.controller')

router.post("/InsertRegisterImage", checkToken, crfRegistration)
router.get("/crfRegimageGet/:id", checkToken, crfRegimageGet)
router.post("/crf/DataCollection", checkToken, crfDataCollection)
router.post("/crf/getDataCollectionImage", checkToken, getDataCollectionImage)

router.post("/crf/ImageInsertHOD", checkToken, ImageInsertHOD)
router.post("/crf/ImageInsertDMS", checkToken, ImageInsertDMS)
router.post("/crf/ImageInsertMS", checkToken, ImageInsertMS)
router.post("/crf/ImageInsertMO", checkToken, ImageInsertMO)
router.post("/crf/ImageInsertSMO", checkToken, ImageInsertSMO)
router.post("/crf/ImageInsertGM", checkToken, ImageInsertGM)
router.post("/crf/ImageInsertMD", checkToken, ImageInsertMD)
router.post("/crf/ImageInsertED", checkToken, ImageInsertED)
// kmch
router.post("/crf/ImageInsertMDKmch", checkToken, ImageInsertMDKmch)
router.post("/crf/ImageInsertManage", checkToken, ImageInsertManaging)

router.get("/crfHodImageGet/:id", checkToken, crfHodImageGet)
router.get("/crfDMSImageGet/:id", checkToken, crfDMSImageGet)
router.get("/crfMSImageGet/:id", checkToken, crfMSImageGet)
router.get("/crfMOImageGet/:id", checkToken, crfMOImageGet)
router.get("/crfSMOImageGet/:id", checkToken, crfSMOImageGet)
router.get("/crfGMImageGet/:id", checkToken, crfGMImageGet)
router.get("/crfMDImageGet/:id", checkToken, crfMDImageGet)
router.get("/crfEDImageGet/:id", checkToken, crfEDImageGet)
// kmc
router.get("/crfManageImageGet/:id", checkToken, crfManageImageGet)
router.get("/crfKmchMdImageGet/:id", checkToken, crfKMCHMDImageGet)
//delivery marking
router.post("/InsertDMimage", checkToken, crfDeliveryMarking)
router.get("/crfDMimageGet/:id", checkToken, crfDMimageGet)


module.exports = router;