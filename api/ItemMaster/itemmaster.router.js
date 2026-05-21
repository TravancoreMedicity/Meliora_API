const { checkToken } = require('../../authentication/token_validation');
const { uploadItemMasterFiles, getItemMasterFilesZip, deleteItemMasterFile, getAllItemMasterFilesZip } = require('../DietUtils/UploadFile');

const {
    insertItemMaster,
    getAllItemMaster,
    updateItemMaster,
    getItemFullDetail
} = require('./itemmaster.controller');

const router = require('express').Router();

router.post("/insert", checkToken, insertItemMaster);
router.get("/getall", checkToken, getAllItemMaster);
router.patch("/update", checkToken, updateItemMaster);
router.post("/uploadItemFiles", checkToken, uploadItemMasterFiles);


router.get("/files/:id", checkToken, getItemMasterFilesZip);
router.get("/allfiles", checkToken, getAllItemMasterFilesZip);
router.post("/files/delete", checkToken, deleteItemMasterFile);

router.get("/item-full-detail", checkToken, getItemFullDetail)

module.exports = router;