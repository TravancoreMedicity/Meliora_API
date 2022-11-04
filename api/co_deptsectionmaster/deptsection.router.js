const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { createDept, updateDept, deleteDept, getDept, getDeptById,
    getDeptsectionStatus, getSelectedDeptSection, getOutlet, getDepartmentsectionId } = require('../co_deptsectionmaster/deptsection.controller');

router.post("/", checkToken, createDept);
router.patch("/", checkToken, updateDept);
router.delete("/", checkToken, deleteDept);
router.get("/", checkToken, getDept);
router.post("/byid", checkToken, getDeptById);
router.get("/status", checkToken, getDeptsectionStatus)
router.get("/:id", checkToken, getSelectedDeptSection)
router.get("/outlet/select", checkToken, getOutlet)
router.get("/deptsecid/id", checkToken, getDepartmentsectionId)



module.exports = router;