const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { uploadFileModel, uploadFilesubModel, uploadFileCategory, uploadFileSubCategory,
    uploadFileGroup, uploadFileSubGroup, uploadFileItem, uploadFileItemDetail
} = require('../fileupload/fileupload.controller')


// router.post("/uploadFile", uploadFile)
router.post("/uploadFile/Model", uploadFileModel)
router.post("/uploadFile/subModel", uploadFilesubModel)
router.post("/uploadFile/Category", uploadFileCategory)
router.post("/uploadFile/SubCategory", uploadFileSubCategory)
router.post("/uploadFile/Group", uploadFileGroup)
router.post("/uploadFile/SubGroup", uploadFileSubGroup)
router.post("/uploadFile/Item", uploadFileItem)

router.post("/uploadFile/ItemDetail", uploadFileItemDetail)

module.exports = router;