const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getProjectListWithGoal, getGoalsList, getMultDepSection, getMultHodInCharge, getNonGoalprojects, getProjectList,
    getprojectFrTaskCreation
} = require('../tm_dropdowns/tm_list.controller');



router.get('/getprojectswithGoal/:id', checkToken, getProjectListWithGoal)
router.get('/getNonGoalprojects', checkToken, getNonGoalprojects)
router.get('/getprojects', checkToken, getProjectList)
router.get('/getprojectFrTaskCreation', checkToken, getprojectFrTaskCreation)


router.get('/getGoals', checkToken, getGoalsList);


router.post('/getMultDepSection', checkToken, getMultDepSection)
router.post('/getMultHodInChargeUnderSection', checkToken, getMultHodInCharge)

module.exports = router;