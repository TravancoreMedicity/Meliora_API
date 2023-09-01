const router = require("express").Router();
const { getTotalNotAssigncomplaints, getComDetlcountEmp, getAssignListEmp, getAssistListEmp,
    getOnHoldListEmp, getOnProgressListEmp, getforVerifyListEmp, getCompleteListEmp,
    getAssignListDeptWise, getAssistListDeptWise, getOnHoldListDeptWise, getOnHoldBeforeAssigntDeptWise,
    getOnProgressListDeptWise, getforVerifyListDeptWise, getCompleteListDeptWiseToday
} = require('../cm_complaint_mobapp/cmmobapp.controller')
const { checkToken } = require("../../authentication/token_validation");


router.get("/notassigncomplaints/deptBased/:id", checkToken, getTotalNotAssigncomplaints);// Total Complaint List For Assign Pending based on Dept
router.get("/getComDetlcountEmp/:id", checkToken, getComDetlcountEmp)//employee based count

//DetalList of Employee Wise
router.get("/assignList/empwise/:id", checkToken, getAssignListEmp);//Assign List
router.get("/assistList/empwise/:id", checkToken, getAssistListEmp);//Assist List
router.get("/onHoldList/empwise/:id", checkToken, getOnHoldListEmp);//On-Hold List
router.get("/onProgressList/empwise/:id", checkToken, getOnProgressListEmp);//On Progress List
router.get("/forVerifyList/empwise/:id", checkToken, getforVerifyListEmp);//Fo Verify List
router.get("/completeList/empwise/:id", checkToken, getCompleteListEmp);//Completed List

//Department Wise List

router.get("/assignList/deptwise/:id", checkToken, getAssignListDeptWise);//Assign List Depatment
router.get("/assistList/deptwise/:id", checkToken, getAssistListDeptWise);//Assist List Depatment
router.get("/onHoldList/deptwise/:id", checkToken, getOnHoldListDeptWise);//On-Hold List Depatment
router.get("/onHoldBeforeAssignList/deptwise/:id", checkToken, getOnHoldBeforeAssigntDeptWise);//On-Hold List Depatment
router.get("/onProgressList/deptwise/:id", checkToken, getOnProgressListDeptWise);//On Progress List Depatment
router.get("/forVerifyList/deptwise/:id", checkToken, getforVerifyListDeptWise);//Fo Verify List Depatment
router.get("/completeList/deptwise/:id", checkToken, getCompleteListDeptWiseToday);//Completed Depatment List Today

module.exports = router;
