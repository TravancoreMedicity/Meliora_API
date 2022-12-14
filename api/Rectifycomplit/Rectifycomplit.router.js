const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getRectifycomplt, Updatecomplit, UpdateVerify, getAssignEmps, updateassignDetail } = require('../Rectifycomplit/Rectifycomplit.controller')

router.get('/getRectifycomplit/:id', checkToken, getRectifycomplt)

router.patch('/updatecmp', checkToken, Updatecomplit)

router.patch('/update/verify', checkToken, UpdateVerify)

router.get('/getAssignEmps/:id', checkToken, getAssignEmps)

router.patch('/updateassignDetail/recty', checkToken, updateassignDetail)


module.exports = router;