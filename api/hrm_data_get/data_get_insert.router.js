const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getdepartment, getdepartmentSection, getemployeemaster, getemployeeuserPass,
    getauthorization, empMasterUpdate, departmentUpdate, departmentSecUpdate, getdesignation,
    getbranch, getSalutation, emploginUpdate
} = require("../hrm_data_get/data_get_insert.controller")

router.get("/dept", checkToken, getdepartment)
router.get("/deptsection", checkToken, getdepartmentSection)
router.get("/employeemaster", checkToken, getemployeemaster)
router.get("/employee/userPass", checkToken, getemployeeuserPass)
router.get("/authorization", checkToken, getauthorization)
router.get("/empMasterUpdate", checkToken, empMasterUpdate)
router.get("/departmentUpdate", checkToken, departmentUpdate)
router.get("/departmentSecUpdate", checkToken, departmentSecUpdate)
router.get("/designation", checkToken, getdesignation)
router.get("/branch", checkToken, getbranch)
router.get("/salutation", checkToken, getSalutation)

router.get("/emploginUpdate", checkToken, emploginUpdate)

module.exports = router;