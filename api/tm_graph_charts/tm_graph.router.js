const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getAlltaskfromtodate, getEmployeeDetails, getAllComplaintsfromtodate, getAllEmployees,
    getDeptComplaintsfromtodate, getDepttaskfromtodate,
    getProjectsfromtodate, getEmployeeImage, EmployeePendingcompl, EmployeeOnholdcompl, DeptOnholdcompl, DeptPendingcompl } = require('./tm_graph.controller');



router.post('/getEmployeeDetails', checkToken, getEmployeeDetails)

router.post('/getAlltaskfromtodate', checkToken, getAlltaskfromtodate)
router.post('/getAllComplaintsfromtodate', checkToken, getAllComplaintsfromtodate)
router.post('/getAllEmployees', checkToken, getAllEmployees)
router.post('/getDepttaskfromtodate', checkToken, getDepttaskfromtodate)
router.post('/getDeptComplaintsfromtodate', checkToken, getDeptComplaintsfromtodate)

router.post('/getProjectsfromtodate', checkToken, getProjectsfromtodate)
router.get("/EmployeeImage/getEmployeeImage/:id", getEmployeeImage)

router.get('/employeePendingcompl/:id', checkToken, EmployeePendingcompl)
router.get('/employeeOnholdcompl/:id', checkToken, EmployeeOnholdcompl)

router.get('/deptOnholdcompl/:id', checkToken, DeptOnholdcompl)
router.get('/deptPendingcompl/:id', checkToken, DeptPendingcompl)





module.exports = router