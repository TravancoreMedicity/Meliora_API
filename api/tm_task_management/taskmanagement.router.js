const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { CreateTaskInsert, CreateTaskDetailInsert, CreateTaskView, CreateSubTaskInsert, CreateTaskSubTaskDetailInsert, SubTaskviewByid, MasterTaskviewBySecid,
    MasterEmpByid, UpdateMasterTask, UpdateSubTask, SubtaskviewByidForEdit, MasterTaskviewByidForEdit, employeeInactive, DeptSearch, GoalView,
    ProjectInsert, ProjectView, ProjectUpdate, GoalDeptInsert, GoalDeptView, GoalDeptUpdate, ProjectDeptView, ProjectDeptSearch,
    GoalDeptSearch } = require('../tm_task_management/taskmanagement.controller');

router.post('/insertTask', checkToken, CreateTaskInsert)
router.get('/viewTask', checkToken, CreateTaskView)
router.get('/viewMasterTaskBySecid/:id', checkToken, MasterTaskviewBySecid)
router.get('/viewMasterTaskByid/:id', checkToken, MasterTaskviewByidForEdit)
router.patch('/updateMasterTask', checkToken, UpdateMasterTask)

router.post('/searchDeptAndSec', checkToken, DeptSearch)
router.post('/searchGoalDeptAndSec', checkToken, GoalDeptSearch)
router.post('/searchProjectDeptAndSec', checkToken, ProjectDeptSearch)

router.post('/insertDetail', checkToken, CreateTaskDetailInsert)
router.get('/viewMasterEmpByid/:id', checkToken, MasterEmpByid)

router.post('/insertSubTask', checkToken, CreateSubTaskInsert)
router.get('/subtaskviewByid/:id', checkToken, SubTaskviewByid)
router.patch('/updateSubTask', checkToken, UpdateSubTask)
router.get('/subtaskviewByidForEdit/:id', checkToken, SubtaskviewByidForEdit)

router.post('/insertSubtaskDetail', checkToken, CreateTaskSubTaskDetailInsert)
router.post("/employeeInactive", checkToken, employeeInactive);

router.post('/insertProject', checkToken, ProjectInsert)
router.get('/viewProject', checkToken, ProjectView)
router.patch('/updateProject', checkToken, ProjectUpdate)
router.get('/viewDeptProject/:id', checkToken, ProjectDeptView)


router.post('/insertDeptGoal', checkToken, GoalDeptInsert)
router.get('/viewDeptGoal/:id', checkToken, GoalDeptView)
router.patch('/updateDeptGoal', checkToken, GoalDeptUpdate)
router.get('/viewGoal', checkToken, GoalView)


module.exports = router