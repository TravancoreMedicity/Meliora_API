const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { dietPlanInsert, getdietplan, updateDietplan, getdietplanNeworder, getdietplanProcess, dietApproval,
    getDietPlanList, getneworderbydateNs, getNewOrderBydate, pendingApproval, ApprovedList, AllList,
    getNewOrderByDiet, pendingAppConsult
} = require('../diet_plan_master/dietplan.controller')

router.post('/insert', checkToken, dietPlanInsert)
router.get('/getdietplan', checkToken, getdietplan)//not use
router.patch('/update/plan', checkToken, updateDietplan)
router.get('/getdietplan/NewOrder', checkToken, getdietplanNeworder)
router.get('/dirtplan/proceeslist', checkToken, getdietplanProcess)
router.patch('/approval', checkToken, dietApproval);

router.get('/dietplanlist', checkToken, getDietPlanList)
router.post('/newbydateNS', checkToken, getneworderbydateNs)
router.post('/newbydate', checkToken, getNewOrderBydate)
router.post('/newByDiet', checkToken, getNewOrderByDiet)

router.get("/pendingApproval/:id", checkToken, pendingApproval)
router.get("/ApprovedList/:id", checkToken, ApprovedList)
router.get("/AllList/:id", checkToken, AllList)

router.get("/consult/approvsl/pending", checkToken, pendingAppConsult)

module.exports = router;