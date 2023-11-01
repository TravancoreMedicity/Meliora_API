const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { uploadFileMonthly, uploadFileQuaterly, uploadFileYearly,
    getMonthlyBillImages, getQuaterlyBillImages, getYearlyBillImages } = require('../it_managemnt_file_upload/it_file_upload.controller')



router.post("/uploadFile/Monthly", checkToken, uploadFileMonthly)
router.post("/uploadFile/Quaterly", checkToken, uploadFileQuaterly)
router.post("/uploadFile/Yearly", checkToken, uploadFileYearly)


router.get("/uploadFile/getMonthlyBillImages/:id", getMonthlyBillImages)
router.get("/uploadFile/getQuaterlyBillImages/:id", getQuaterlyBillImages)
router.get("/uploadFile/getYearlyBillImages/:id", getYearlyBillImages)






module.exports = router;
