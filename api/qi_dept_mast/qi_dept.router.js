
const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { qiDeptListInsert, DepartmentListView, DepartmentUpdate, getDepartmentActive } = require('./qi_dept.controller');
router.post('/insert', checkToken, qiDeptListInsert);
router.get('/select', checkToken, DepartmentListView);
router.patch('/update', checkToken, DepartmentUpdate);
router.get('/active', checkToken, getDepartmentActive);

module.exports = router;