const router = require("express").Router();
const { getTotalcomplaints, getAssistRectyEmpWise, getPendingOnholdEmpWise, getOnholdcomplaints, getComplaintcount, getTotalcomplaintsAllDpt, getOnholdcomplaintsAllDpt,
     getAllCompDeptwiseCount,getempAssignTicketCount,getempHoldTicketCountt,getempTodayRectifyTicketCount,getempTodayVerifiedTicketCount,getsuperviPendingVerifiTicketCount,
     getDeptAssignTicketCount,getDeptHoldTicketCount,getempAssistReceiveTicketCount,getDeptAssistReceiveTicketCount,getDeptTodayRectifyTicketCount,getDeptTodayVerifyTicketCount,
     getDeptAllAssistRequestTicketCount} = require('../complaint_dashboard/cmDashboard.controller')
const { checkToken } = require("../../authentication/token_validation");


router.get("/totalcomplaints/alldept", checkToken, getTotalcomplaintsAllDpt);
router.get("/onholdcomplaints/alldept", checkToken, getOnholdcomplaintsAllDpt);
router.get("/totalcomplaints/:id", checkToken, getTotalcomplaints);
router.get("/onholdcomplaints/:id", checkToken, getOnholdcomplaints);
router.get("/getComplaintcountEmp/:id", checkToken, getComplaintcount)//employees count
router.get("/asistRecty/empwise/:id", checkToken, getAssistRectyEmpWise);
router.get("/pendingOnhold/empwise/:id", checkToken, getPendingOnholdEmpWise);
router.get("/getALLComplaintcountDept/:id", checkToken, getAllCompDeptwiseCount)

router.get("/empAssignTicketCount/:id", checkToken, getempAssignTicketCount);
router.get("/empHoldTicketCount/:id", checkToken, getempHoldTicketCountt);
router.get("/empTodayRectifyTicketCount/:id", checkToken, getempTodayRectifyTicketCount);
router.get("/empTodayVerifiedTicketCount/:id", checkToken, getempTodayVerifiedTicketCount);
router.get("/empAssistReceiveTicketCount/:id", checkToken, getempAssistReceiveTicketCount);

router.get("/superviPendingVerifiTicketCount/:id", checkToken, getsuperviPendingVerifiTicketCount);
router.get("/deptAssignTicketCount/:id", checkToken, getDeptAssignTicketCount);
router.get("/deptHoldTicketCount/:id", checkToken, getDeptHoldTicketCount);
router.get("/deptTodayRectifyTicketCount/:id", checkToken, getDeptTodayRectifyTicketCount);
router.get("/deptTodayVerifyTicketCount/:id", checkToken, getDeptTodayVerifyTicketCount);
router.get("/deptAssistReceiveTicketCount/:id", checkToken, getDeptAssistReceiveTicketCount);
router.get("/deptAllAssistRequestTicketCount/:id", checkToken, getDeptAllAssistRequestTicketCount);

module.exports = router;