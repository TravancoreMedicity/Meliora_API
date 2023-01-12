const router = require("express").Router();
const { getTotalcomplaints, getAssistRectyEmpWise, getPendingOnholdEmpWise, getOnholdcomplaints,
    getComplaintcount, getTotalcomplaintsAllDpt, getOnholdcomplaintsAllDpt, getAllCompDeptwiseCount
} = require('../complaint_dashboard/cmDashboard.controller')
const { checkToken } = require("../../authentication/token_validation");


router.get("/totalcomplaints/alldept", checkToken, getTotalcomplaintsAllDpt);
router.get("/onholdcomplaints/alldept", checkToken, getOnholdcomplaintsAllDpt);
router.get("/totalcomplaints/:id", checkToken, getTotalcomplaints);
router.get("/onholdcomplaints/:id", checkToken, getOnholdcomplaints);
router.get("/getComplaintcountEmp/:id", checkToken, getComplaintcount)//employees count
router.get("/asistRecty/empwise/:id", checkToken, getAssistRectyEmpWise);
router.get("/pendingOnhold/empwise/:id", checkToken, getPendingOnholdEmpWise);


router.get("/getALLComplaintcountDept/:id", checkToken, getAllCompDeptwiseCount)//employees count



module.exports = router;