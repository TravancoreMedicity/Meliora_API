const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { createDept, updateDept, deleteDept, getDept, getDeptById, getDeptStatus, getDepartmentId } = require('../co_departmentmaster/department.controller');

router.post("/", checkToken, createDept);
router.patch("/", checkToken, updateDept);
router.delete("/", checkToken, deleteDept);

router.get("/", checkToken, getDept);

router.post("/byid", checkToken, getDeptById);

router.get('/status', checkToken, getDeptStatus);
router.get('/deptid', checkToken, getDepartmentId);

module.exports = router;