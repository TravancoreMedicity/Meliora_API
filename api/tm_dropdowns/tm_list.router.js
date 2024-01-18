const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getProjectList, getGoalsList } = require('../tm_dropdowns/tm_list.controller');



router.get('/getprojects', checkToken, getProjectList);
router.get('/getGoals', checkToken, getGoalsList);


module.exports = router;