const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { CreateTaskInsert, CreateTaskDetailInsert, CreateTaskView, CreateSubTaskInsert, CreateTaskSubTaskDetailInsert, SubTaskviewByid, MasterTaskviewBySecid,
    MasterEmpByid, UpdateMasterTask, UpdateSubTask, SubtaskviewByidForEdit, MasterTaskviewByidForEdit, employeeInactive, DeptSearch, ProgressInsert,
    ProjectInsert, ProjectView, ProjectUpdate, GoalDeptInsert, GoalDeptUpdate, ProjectDeptView, ProjectDeptSearch, ProgressView, getAllDueDates,
    GoalDeptSearch, ProgressUpdate, SubProgressView, SearchProjectAndEmployee, AllTaskListProjectz, getAllGoals, getDeptGoals, getDeptProjects, subtaskUnderdepSec,
    getAllEmpUnderdept,getAllCompletedTask

} = require('../tm_task_management/taskmanagement.controller');

router.post('/insertTask', checkToken, CreateTaskInsert)
router.get('/viewTask', checkToken, CreateTaskView)
router.get('/viewMasterTaskByDeptId/:id', checkToken, MasterTaskviewBySecid)
router.get('/viewMasterTaskByid/:id', checkToken, MasterTaskviewByidForEdit)
router.patch('/updateMasterTask', checkToken, UpdateMasterTask)

router.post('/searchDeptAndSec', checkToken, DeptSearch)
router.post('/searchGoalDeptAndSec', checkToken, GoalDeptSearch)
router.post('/searchProjectDeptAndSec', checkToken, ProjectDeptSearch)

router.post('/insertDetail', checkToken, CreateTaskDetailInsert)
router.get('/viewMasterEmpByid/:id', checkToken, MasterEmpByid)
router.post('/insertSubTask', checkToken, CreateSubTaskInsert)

router.patch('/updateSubTask', checkToken, UpdateSubTask)
router.get('/subtaskviewByidForEdit/:id', checkToken, SubtaskviewByidForEdit)
router.post('/insertSubtaskDetail', checkToken, CreateTaskSubTaskDetailInsert)
router.post("/employeeInactive", checkToken, employeeInactive);

router.get('/viewDeptProject/:id', checkToken, ProjectDeptView)
router.post('/insertDeptGoal', checkToken, GoalDeptInsert)
router.patch('/updateDeptGoal', checkToken, GoalDeptUpdate)
router.get('/getAllGoals', checkToken, getAllGoals);
router.get('/getDeptGoals/:id', checkToken, getDeptGoals)

router.post('/insertProject', checkToken, ProjectInsert)
router.get('/viewProject', checkToken, ProjectView)
router.patch('/updateProject', checkToken, ProjectUpdate)
router.get('/getDeptProjects/:id', checkToken, getDeptProjects)

router.post('/insertProgress', checkToken, ProgressInsert)
router.post('/viewProgress', checkToken, ProgressView)
router.post('/viewSubProgress', checkToken, SubProgressView)
router.patch('/updateProgress', checkToken, ProgressUpdate)

router.post('/searchProjectAndEmployee', checkToken, SearchProjectAndEmployee)
router.get('/getAllDueDates/:id', checkToken, getAllDueDates)
router.post('/allTaskListProjectz', checkToken, AllTaskListProjectz)

router.get('/subtaskviewByid/:id', checkToken, SubTaskviewByid)
router.post('/subtaskUnderdepSec', checkToken, subtaskUnderdepSec)
router.get('/getAllEmpUnderdept/:id', checkToken, getAllEmpUnderdept)

router.post("/getAllCompletedTasks", checkToken, getAllCompletedTask)


module.exports = router