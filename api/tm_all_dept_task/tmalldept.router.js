const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { TaskInsertAllDept, getAssignedTask, AcceptTask, getRejectedTask, getprojectundergoal, getTaskunderProject, subtaskviewByidPending, getPendingAssignedTask,
    AskQuery, postDuedateCount, getDuedateCount, postCutoffPercentage, getCutoffPercentages, TruncatePercentage, getQuery, replyQuery
} = require('./tmalldept.controller');

router.post('/insertTask', checkToken, TaskInsertAllDept)
router.post('/getAssignedTask', checkToken, getAssignedTask)
router.patch('/acceptTask', checkToken, AcceptTask)
router.get('/getRejectedTask', checkToken, getRejectedTask)
router.get('/getPendingAssignedTask', checkToken, getPendingAssignedTask)
router.get('/getprojectundergoal/:id', checkToken, getprojectundergoal)
router.get('/getTaskunderProject/:id', checkToken, getTaskunderProject)
router.get('/subtaskviewByidPending/:id', checkToken, subtaskviewByidPending)

router.post('/postDuedateCount', checkToken, postDuedateCount)
router.get('/getDuedateCount/:id', checkToken, getDuedateCount)
router.post('/postCutoffPercentage', checkToken, postCutoffPercentage)
router.get('/getCutoffPercentages/:id', checkToken, getCutoffPercentages)
router.post("/TruncatePercentage", checkToken, TruncatePercentage);

router.post('/askQuery', checkToken, AskQuery)
router.post('/getQuery', checkToken, getQuery)
router.post('/replyQuery', checkToken, replyQuery)

module.exports = router;
