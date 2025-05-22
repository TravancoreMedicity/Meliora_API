const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getAllEmployee, ticketTypeBarchart, getAlltodaysTickets, getOpenTicketsCount, getclosedTodayTicket, getmonthlyTicketchart,
    getTicketOpenWithIn, getTicketClosedWithIn, getDeptPending, getTodayAssing, getRegistrdFromSixDays, getclosedFromSixDays, getRegTodayInPend, AllcomplaintDept,
    getAllDeptemployeeList, getPevRegTodayAssing, getRegTodayAssignToday, getPevAssingTodayRect, getallDeptPending, getAllDepttodaysTickets, getAllDeptopenTicketsCount,
    getallDeptclosedTodayTicket, getallDeptRegTodayInPend, getallDeptPevRegTodayAssing, getallDepttRegTodayAssignToday, getallDeptPevAssingTodayRect,
    getallDeptRegistrdFromSixDays, getallDeptClosedFromSixDays, getAllDeptPieTicketchart, AllDeptopenWithIn, AllDeptcloseWithIn, getEmployeeuserrightsMenu
}
    = require('./cm_dashboard.controller')

router.post("/employeeList", checkToken, getAllEmployee)
router.post("/ticketTypeBarchart", checkToken, ticketTypeBarchart)
router.post("/todaysTickets", checkToken, getAlltodaysTickets)
router.post("/getDeptPending", checkToken, getDeptPending)
router.post("/closedTodayTicket", checkToken, getclosedTodayTicket)
router.post("/openTicketsCount", checkToken, getOpenTicketsCount)
router.post("/monthlyTicketchart", checkToken, getmonthlyTicketchart)
router.post("/openWithIn", checkToken, getTicketOpenWithIn)
router.post("/closeWithIn", checkToken, getTicketClosedWithIn)
router.post("/getTodayAssing", checkToken, getTodayAssing)
router.post("/getClosedFromSixDays", checkToken, getclosedFromSixDays)
router.post("/getRegistrdFromSixDays", checkToken, getRegistrdFromSixDays)
router.post("/getRegTodayInPend", checkToken, getRegTodayInPend)
router.post("/AllcomplaintDept", checkToken, AllcomplaintDept)
router.post("/AllDeptemployeeList", checkToken, getAllDeptemployeeList)
router.post("/getPevRegTodayAssing", checkToken, getPevRegTodayAssing)
router.post("/getRegTodayAssignToday", checkToken, getRegTodayAssignToday)
router.post("/getPevAssingTodayRect", checkToken, getPevAssingTodayRect)
router.get('/getallDeptPending', checkToken, getallDeptPending)
router.get('/getAllDepttodaysTickets', checkToken, getAllDepttodaysTickets)
router.get('/getAllDeptopenTicketsCount', checkToken, getAllDeptopenTicketsCount)
router.get('/getallDeptclosedTodayTicket', checkToken, getallDeptclosedTodayTicket)
router.get('/getallDeptRegTodayInPend', checkToken, getallDeptRegTodayInPend)
router.get('/getallDeptPevRegTodayAssing', checkToken, getallDeptPevRegTodayAssing)
router.post("/getallDeptRegistrdFromSixDays", checkToken, getallDeptRegistrdFromSixDays)
router.post("/getallDeptClosedFromSixDays", checkToken, getallDeptClosedFromSixDays)
router.get('/getallDepttRegTodayAssignToday', checkToken, getallDepttRegTodayAssignToday)
router.get('/getallDeptPevAssingTodayRect', checkToken, getallDeptPevAssingTodayRect)
router.post("/getAllDeptPieTicketchart", checkToken, getAllDeptPieTicketchart)
router.post("/AllDeptopenWithIn", checkToken, AllDeptopenWithIn)
router.post("/AllDeptcloseWithIn", checkToken, AllDeptcloseWithIn)
router.post("/getEmployeeuserrightsMenu", checkToken, getEmployeeuserrightsMenu)

module.exports = router