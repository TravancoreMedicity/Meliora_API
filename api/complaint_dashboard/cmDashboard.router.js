const router = require("express").Router();
const { getTotalcomplaints, getPendingcomplaints, getAssignedcomplaints,
    getOnholdcomplaints, getRectifycomplaints, getVerifycomplaints } = require('../complaint_dashboard/cmDashboard.controller')
const { checkToken } = require("../../authentication/token_validation");

router.get("/totalcomplaints/:id", checkToken, getTotalcomplaints);
router.get("/pendingcomplaints/:id", checkToken, getPendingcomplaints);
router.get("/assignedcomplaints/:id", checkToken, getAssignedcomplaints);
router.get("/onholdcomplaints/:id", checkToken, getOnholdcomplaints);
router.get("/rectifycomplaints/:id", checkToken, getRectifycomplaints);
router.get("/verifycomplaints/:id", checkToken, getVerifycomplaints);
module.exports = router;