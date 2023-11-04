const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { uploadFileModel, uploadFilesubModel, uploadFileCategory, uploadFileSubCategory,
    uploadFileGroup, uploadFileSubGroup, uploadFileItem, uploadFileItemDetail,

} = require('../fileupload/fileupload.controller')


// router.post("/uploadFile", uploadFile)

router.post("/uploadFile/Model", checkToken, uploadFileModel)
router.post("/uploadFile/subModel", checkToken, uploadFilesubModel)
router.post("/uploadFile/Category", checkToken, uploadFileCategory)
router.post("/uploadFile/SubCategory", checkToken, uploadFileSubCategory)
router.post("/uploadFile/Group", checkToken, uploadFileGroup)
router.post("/uploadFile/SubGroup", checkToken, uploadFileSubGroup)
router.post("/uploadFile/Item", checkToken, uploadFileItem)
router.post("/uploadFile/ItemDetail", checkToken, uploadFileItemDetail)

module.exports = router;
