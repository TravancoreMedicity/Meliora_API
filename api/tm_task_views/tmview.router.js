const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { ViewOverDueToday, ViewOverDueNextWeek, ViewOverDueNextMonth, EmployeeOnProgress, EmployeeCompleted,
    EmployeeInCompleted, EmployeeOverDue, DepartmentOnProgress, DepartmentCompleted, DepartmentInCompleted, DepartmentOverDue,
    ProjectOnProgress, ProjectCompleted, ProjectOverDue, GoalsOnProgress, GoalsCompleted, GoalsOverDue,
} = require('../tm_task_views/tmview.controller');

router.get('/ViewOverDueToday/:id', checkToken, ViewOverDueToday)
router.get('/ViewOverDueNextWeek/:id', checkToken, ViewOverDueNextWeek)
router.get('/ViewOverDueNextMonth/:id', checkToken, ViewOverDueNextMonth)

router.get('/employeeOnProgress/:id', checkToken, EmployeeOnProgress)
router.get('/employeeCompleted/:id', checkToken, EmployeeCompleted)
router.get('/employeeInCompleted/:id', checkToken, EmployeeInCompleted)
router.get('/employeeOverDue/:id', checkToken, EmployeeOverDue)

router.get('/departmentOnProgress/:id', checkToken, DepartmentOnProgress)
router.get('/departmentCompleted/:id', checkToken, DepartmentCompleted)
router.get('/departmentInCompleted/:id', checkToken, DepartmentInCompleted)
router.get('/departmentOverDue/:id', checkToken, DepartmentOverDue)

router.get('/projectOnProgress/:id', checkToken, ProjectOnProgress)
router.get('/projectCompleted/:id', checkToken, ProjectCompleted)
router.get('/ProjectOverDue/:id', checkToken, ProjectOverDue)

router.get('/goalsOnProgress/:id', checkToken, GoalsOnProgress)
router.get('/goalsCompleted/:id', checkToken, GoalsCompleted)
router.get('/goalsOverDue/:id', checkToken, GoalsOverDue)


module.exports = router
