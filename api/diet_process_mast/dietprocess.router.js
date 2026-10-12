const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { dietProcessinsert, getdietprocess, updatedietprocess, getdietmenubyId, processDetailInsert,
    getNewlyInserted, getmenubyallprocess, getproceedcount, getNewOrderCount } = require('../diet_process_mast/dietprocess.controller')

const { requireMenuRight } = require("../../authentication/menuRights");
const { stampActor } = require("../../authentication/userChecks");
const { MENU_DIET_PROCESS } = require("../../authentication/menuNumbers");

router.post("/", checkToken, requireMenuRight(MENU_DIET_PROCESS), stampActor('em_id'), dietProcessinsert)
router.get('/get/dietprocess', checkToken, getdietprocess)
router.patch('/update/dietprocess', checkToken, requireMenuRight(MENU_DIET_PROCESS), stampActor('em_id'), updatedietprocess)
router.post('/dmenubyday', checkToken, getdietmenubyId)
router.post('/getNewlyInserted', checkToken, getNewlyInserted)
router.post('/dmenubyday/allprocess', checkToken, getmenubyallprocess)

router.post('/processDetailInsert', checkToken, requireMenuRight(MENU_DIET_PROCESS),processDetailInsert)
router.post('/getproceedcount', checkToken, getproceedcount)
router.post('/getNewOrderCount', checkToken, getNewOrderCount)
module.exports = router;