const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");

const { getEmployeeName, qiDeptAccessInsert, dptAccessView, DepartmentUpdate } = require('./dept_access.controller');
router.get('/emp/:id', checkToken, getEmployeeName);
router.post('/insert', checkToken, qiDeptAccessInsert);
router.get('/select', checkToken, dptAccessView);
router.patch('/update', checkToken, DepartmentUpdate);
module.exports = router;