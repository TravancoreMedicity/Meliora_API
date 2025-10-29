const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { ViewOverDueToday, ViewOverDueNextWeek, ViewOverDueNextMonth, EmployeeOnProgress, EmployeeCompleted, EmployeeOnHold, DepartmentPending, ViewAllEmployeeTask,
    EmployeeInCompleted, EmployeeOverDue, DepartmentOnProgress, DepartmentCompleted, DepartmentInCompleted, DepartmentOverDue, DepartmentOnHold,
    ProjectOnProgress, ProjectCompleted, ProjectOverDue, GoalsOnProgress, GoalsCompleted, GoalsOverDue, EmployeeAllTask, EmployeeName, EmployeeOnPending,
    ProjectInCompleted, GoalsInCompleted, EmpProjectTask, EmpTaskCount, AllEmployeeProject, TTCTcountUnderProject,
    EmployeeTTCTcount, AllEmployeeTask, AllTaskUnderProject, EmpTaskCountWithoutProject, SubTaskUnderTask, getAllProjects, AllTaskEmp, AllComplaintsEmp,deptOverDue,
    deptCompleted,EmpDelegatedTasks
} = require('../tm_task_views/tmview.controller');

router.get('/ViewOverDueToday/:id', checkToken, ViewOverDueToday)
router.get('/ViewOverDueNextWeek/:id', checkToken, ViewOverDueNextWeek)
router.get('/ViewOverDueNextMonth/:id', checkToken, ViewOverDueNextMonth)
router.get('/employeeOnProgress/:id', checkToken, EmployeeOnProgress)
router.get('/employeeCompleted/:id', checkToken, EmployeeCompleted)
router.get('/employeeInCompleted/:id', checkToken, EmployeeInCompleted)
router.get('/employeeOverDue/:id', checkToken, EmployeeOverDue)
router.get('/employeeAllTask/:id', checkToken, EmployeeAllTask)
router.get('/employeeOnHold/:id', checkToken, EmployeeOnHold)
router.get('/employeeOnPending/:id', checkToken, EmployeeOnPending)
router.get('/empname/:id', checkToken, EmployeeName)
router.get('/departmentOnProgress/:id', checkToken, DepartmentOnProgress)
router.get('/departmentCompleted/:id', checkToken, DepartmentCompleted)
router.get('/departmentInCompleted/:id', checkToken, DepartmentInCompleted)
router.get('/departmentOverDue/:id', checkToken, DepartmentOverDue)
router.get('/departmentOnHold/:id', checkToken, DepartmentOnHold)
router.get('/departmentPending/:id', checkToken, DepartmentPending)
router.get('/viewAllEmployeeTask/:id', checkToken, ViewAllEmployeeTask)
router.get('/projectOnProgress/:id', checkToken, ProjectOnProgress)
router.get('/projectCompleted/:id', checkToken, ProjectCompleted)
router.get('/projectInCompleted/:id', checkToken, ProjectInCompleted)
router.get('/ProjectOverDue/:id', checkToken, ProjectOverDue)
router.get('/goalsOnProgress/:id', checkToken, GoalsOnProgress)
router.get('/goalsCompleted/:id', checkToken, GoalsCompleted)
router.get('/goalsInCompleted/:id', checkToken, GoalsInCompleted)
router.get('/goalsOverDue/:id', checkToken, GoalsOverDue)
router.get('/EmpProjectTask/:id', checkToken, EmpProjectTask)
router.post('/EmpTaskCountUnderProject', checkToken, EmpTaskCount)
router.get('/allEmployeeProject/:id', checkToken, AllEmployeeProject)
router.post('/TTCTcountUnderProject', checkToken, TTCTcountUnderProject)
router.post('/EmployeeTTCTcount', checkToken, EmployeeTTCTcount)
router.get('/allEmployeeTaskList/:id', checkToken, AllEmployeeTask)
router.post('/allTaskUnderProject', checkToken, AllTaskUnderProject)
router.post('/subTaskUnderTask', checkToken, SubTaskUnderTask)
router.post('/EmpTaskCountWithoutProject', checkToken, EmpTaskCountWithoutProject)
router.get('/getAllProjects', checkToken, getAllProjects)
router.get('/AllTaskEmp/:id', checkToken, AllTaskEmp)
router.get('/AllComplaintsEmp/:id', checkToken, AllComplaintsEmp)
router.get('/deptOverDue/:id', checkToken, deptOverDue)
router.get('/deptCompleted/:id', checkToken, deptCompleted)

router.get('/empDelegatedTasks/:id', checkToken, EmpDelegatedTasks)


module.exports = router
