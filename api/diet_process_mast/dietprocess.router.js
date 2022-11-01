const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { dietProcessinsert, getdietprocess, updatedietprocess, getdietmenubyId, processDetailInsert,
    getNewlyInserted, getmenubyallprocess, getproceedcount, getNewOrderCount } = require('../diet_process_mast/dietprocess.controller')

router.post("/", checkToken, dietProcessinsert)
router.get('/get/dietprocess', checkToken, getdietprocess)
router.patch('/update/dietprocess', checkToken, updatedietprocess)
router.post('/dmenubyday', checkToken, getdietmenubyId)
router.post('/getNewlyInserted', checkToken, getNewlyInserted)
router.post('/dmenubyday/allprocess', checkToken, getmenubyallprocess)

router.post('/processDetailInsert', checkToken, processDetailInsert)
router.post('/getproceedcount', checkToken, getproceedcount)
router.post('/getNewOrderCount', checkToken, getNewOrderCount)
module.exports = router;