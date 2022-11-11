const router = require("express").Router();
const { getTotalcomplaints, getPendingcomplaints, getAssignedcomplaints,
    getOnholdcomplaints, getRectifycomplaints, getVerifycomplaints, getEmployeeProgressDash, getEmployeeProgressPending } = require('../complaint_dashboard/cmDashboard.controller')
const { checkToken } = require("../../authentication/token_validation");

router.get("/totalcomplaints/:id", checkToken, getTotalcomplaints);
router.get("/pendingcomplaints/:id", checkToken, getPendingcomplaints);
router.get("/assignedcomplaints/:id", checkToken, getAssignedcomplaints);
router.get("/onholdcomplaints/:id", checkToken, getOnholdcomplaints);
router.get("/rectifycomplaints/:id", checkToken, getRectifycomplaints);
router.get("/verifycomplaints/:id", checkToken, getVerifycomplaints);
router.post("/empprogress", checkToken, getEmployeeProgressDash);
router.get("/empprogpending", checkToken, getEmployeeProgressPending);
module.exports = router;