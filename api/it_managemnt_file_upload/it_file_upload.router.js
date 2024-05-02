const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { uploadFileMonthly, uploadFileQuaterly, uploadFileYearly, uploadOtherFile,
    getMonthlyBillImages, getQuaterlyBillImages, getYearlyBillImages, getOtherBillImages, TeleMonthlyBills } = require('../it_managemnt_file_upload/it_file_upload.controller')


router.post("/uploadFile/Monthly", checkToken, uploadFileMonthly)
router.post("/uploadFile/Quaterly", checkToken, uploadFileQuaterly)
router.post("/uploadFile/Yearly", checkToken, uploadFileYearly)
router.post("/uploadFile/Others", uploadOtherFile)

router.get("/uploadFile/getMonthlyBillImages/:id", getMonthlyBillImages)
router.get("/uploadFile/getQuaterlyBillImages/:id", getQuaterlyBillImages)
router.get("/uploadFile/getYearlyBillImages/:id", getYearlyBillImages)
router.get("/uploadFile/getOtherBillImages/:id", getOtherBillImages)


router.get('/teleMonthlyBills', checkToken, TeleMonthlyBills)



module.exports = router;
