const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { hallbookingInsert, getHallBooking, hallbookingUpdate, gethallnameSlno,
    HalldeptApproval, getHallBookingApproval, updateCeoApproval, gethallbookslno,
    updateInchargeaproval, updatehodApproval } = require('./hallBooking.controller')

router.post("/", checkToken, hallbookingInsert);
router.get("/", checkToken, getHallBooking);
router.patch("/", checkToken, hallbookingUpdate);
router.get('/hallname', checkToken, gethallnameSlno)
router.post('/hDept', checkToken, HalldeptApproval)
router.get('/getapproval', checkToken, getHallBookingApproval)
router.patch('/ceopproval', checkToken, updateCeoApproval)
router.get('/hallbookslno', checkToken, gethallbookslno)
router.patch('/inchargeAppr', checkToken, updateInchargeaproval)
router.patch('/patchHod', checkToken, updatehodApproval)
module.exports = router;