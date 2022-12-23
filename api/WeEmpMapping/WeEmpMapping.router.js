const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { insertWeEmployee, getWeEmpMapping, updateWeEmployee, getfloorbyEmp } = require('../WeEmpMapping/WeEMpMapping.controller')

router.post('/insertWeEmp', checkToken, insertWeEmployee)
router.get('/get', checkToken, getWeEmpMapping)
router.patch('/update', checkToken, updateWeEmployee)
router.get('/floorEmp/:id', checkToken, getfloorbyEmp)



module.exports = router;