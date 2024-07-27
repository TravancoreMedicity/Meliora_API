
const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { qiDeptListInsert, DepartmentListView, DepartmentUpdate, getDepartmentActive, getAllActiveDepartment } = require('./qi_dept.controller');
router.post('/insert', checkToken, qiDeptListInsert);
router.get('/select', checkToken, DepartmentListView);
router.patch('/update', checkToken, DepartmentUpdate);
router.get('/active/:id', checkToken, getDepartmentActive);
router.get('/allActive', checkToken, getAllActiveDepartment);


module.exports = router;