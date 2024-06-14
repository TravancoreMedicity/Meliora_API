const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { TaskInsertAllDept, getAssignedTask, AcceptTask, getRejectedTask, getprojectundergoal, getTaskunderProject, subtaskviewByidPending, getPendingAssignedTask
} = require('./tmalldept.controller');

router.post('/insertTask', checkToken, TaskInsertAllDept)

router.post('/getAssignedTask', checkToken, getAssignedTask)
router.patch('/acceptTask', checkToken, AcceptTask)

router.get('/getRejectedTask', checkToken, getRejectedTask)
router.get('/getPendingAssignedTask', checkToken, getPendingAssignedTask)

router.get('/getprojectundergoal/:id', checkToken, getprojectundergoal)
router.get('/getTaskunderProject/:id', checkToken, getTaskunderProject)

router.get('/subtaskviewByidPending/:id', checkToken, subtaskviewByidPending)

module.exports = router;