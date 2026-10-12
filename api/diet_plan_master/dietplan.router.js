const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { requireMenuRight } = require("../../authentication/menuRights");
const { MENU_DIET_MASTER, MENU_DIET_APPROVAL } = require("../../authentication/menuNumbers");
const { dietPlanInsert, getdietplan, updateDietplan, getdietplanNeworder, getdietplanProcess, dietApproval,
    getDietPlanList, getneworderbydateNs, getNewOrderBydate, pendingApproval, ApprovedList, AllList,
    getNewOrderByDiet, pendingAppConsult
} = require('../diet_plan_master/dietplan.controller')

// OLD plan module: no screen calls /insert or /update/plan any more (the live flow is /api/patientdietplan),
// so they are limited to the Diet Master right instead of staying open to every login.
router.post('/insert', checkToken, requireMenuRight(MENU_DIET_MASTER), dietPlanInsert)
router.get('/getdietplan', checkToken, getdietplan)//not use
router.patch('/update/plan', checkToken, requireMenuRight(MENU_DIET_MASTER), updateDietplan)
router.get('/getdietplan/NewOrder', checkToken, getdietplanNeworder)
router.get('/dirtplan/proceeslist', checkToken, getdietplanProcess)
router.patch('/approval', checkToken, requireMenuRight(MENU_DIET_APPROVAL), dietApproval);

router.get('/dietplanlist', checkToken, getDietPlanList)
router.post('/newbydateNS', checkToken, getneworderbydateNs)
router.post('/newbydate', checkToken, getNewOrderBydate)
router.post('/newByDiet', checkToken, getNewOrderByDiet)

router.get("/pendingApproval/:id", checkToken, pendingApproval)
router.get("/ApprovedList/:id", checkToken, ApprovedList)
router.get("/AllList/:id", checkToken, AllList)

router.get("/consult/approvsl/pending", checkToken, pendingAppConsult)

module.exports = router;