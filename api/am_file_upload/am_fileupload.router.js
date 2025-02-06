const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { AmcCmcImage, AmcCmcImageView, BillMasterImage, BillMasterImageView,
    LeaseMasterImage, LeaseMasterImageView, GaurenteeWarrenteeFile, GaurenteeWarrenteeFileView
} = require('../am_file_upload/am_fileupload.controller')

router.post("/asset/AmcCmcImage", checkToken, AmcCmcImage)
router.get("/AmcCmcImageView/:id", checkToken, AmcCmcImageView)

router.post("/asset/BillMasterImage", checkToken, BillMasterImage)
router.get("/BillMasterImageView/:id", checkToken, BillMasterImageView)

router.post("/asset/LeaseMasterImage", checkToken, LeaseMasterImage)
router.get("/LeaseMasterImageView/:id", checkToken, LeaseMasterImageView)


router.post("/asset/GaurenteeWarrentee", checkToken, GaurenteeWarrenteeFile)
router.get("/GaurenteeWarrenteefileView/:id", checkToken, GaurenteeWarrenteeFileView)

module.exports = router;