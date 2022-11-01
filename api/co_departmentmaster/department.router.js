const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { createDept, updateDept, deleteDept, getDept, getDeptById, getDeptStatus } = require('../co_departmentmaster/department.controller');

router.post("/", checkToken, createDept);
router.patch("/", checkToken, updateDept);
router.delete("/", checkToken, deleteDept);

router.get("/", checkToken, getDept);

router.post("/byid", checkToken, getDeptById);

router.get('/status', checkToken, getDeptStatus);

module.exports = router;