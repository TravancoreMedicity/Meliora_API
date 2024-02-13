const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { EmpTaskSearch, DeptSearch } = require('../tm_reports/tmreports.controller');

router.post('/searchDeptAndSec', checkToken, DeptSearch)
router.post('/searchEmployeTask', checkToken, EmpTaskSearch)

module.exports = router