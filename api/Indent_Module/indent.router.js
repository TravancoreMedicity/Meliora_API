const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { normalRateLimiter } = require("../../middleware/rateLimiter");

const { getRepData, statusUpdate, insertMedicalDocs, getloginRepData, getTotalTokenCount,
    getBookedTokenCount, getDeptTokenCount, getAppointmentsByRepId, getCertificateDetailsByToken,
    updateMedicalDocs, getIndentMedicines, updateCertificateStatus, updateMedicineRejectionStatus, updateMedicineApprovalStatus,
    getAppointmentsByDate, getCompanies, getDivisions, insertCompany, registerMedicalRep, getApproveAppointmentsByRepId, updateCommercialDetails,
    generateOTPNew, generateOTPForgotPassword, verifyOTPNew, changePasswordNew, insertIndentForm, getIndentFormByToken, getApprovedMedicines } = require('../Indent_Module/indent.controller');

router.post('/insertIndentForm', normalRateLimiter, checkToken, insertIndentForm);
router.get('/getIndentFormByToken', checkToken, getIndentFormByToken);
router.get('/getRepData', checkToken, getRepData)
router.post('/statusUpdate', checkToken, statusUpdate)
router.post("/insertMedicalDocs", normalRateLimiter, checkToken, insertMedicalDocs)
router.get('/getuserLoginrep', checkToken, getloginRepData)
router.get('/getTotalTokenCount', checkToken, getTotalTokenCount)
router.get('/getBookedTokenCount', checkToken, getBookedTokenCount)
router.get('/getDeptTokenCount', checkToken, getDeptTokenCount)
router.get('/getAppointmentsByRepId', checkToken, getAppointmentsByRepId)
router.get('/getAppointmentsByDate', checkToken, getAppointmentsByDate)
router.get('/getCertificateDetailsByToken', checkToken, getCertificateDetailsByToken)
router.patch('/updateMedicalDocs', checkToken, updateMedicalDocs)
router.get('/getIndentMedicines', checkToken, getIndentMedicines)
router.patch('/updateCertificateStatus', checkToken, updateCertificateStatus)
router.patch('/updateMedicineRejectionStatus', checkToken, updateMedicineRejectionStatus)
router.patch('/updateMedicineApprovalStatus', checkToken, updateMedicineApprovalStatus)
router.patch('/updateCommercialDetails', checkToken, updateCommercialDetails)

router.get('/getCompanies', getCompanies)
router.get('/getDivisions', getDivisions)
router.post('/insertCompany', insertCompany)
router.post('/registerRep', registerMedicalRep)

// New OTP based Password Change Routes
router.post('/generateOTPNew', generateOTPNew)
router.post('/generateOTPForgotPassword', generateOTPForgotPassword)
router.post('/verifyOTPNew', verifyOTPNew)
router.post('/changePasswordNew', changePasswordNew)
router.get('/getApproveAppointmentsByRepId', checkToken, getApproveAppointmentsByRepId)
router.get('/getApprovedMedicines', checkToken, getApprovedMedicines)


module.exports = router;