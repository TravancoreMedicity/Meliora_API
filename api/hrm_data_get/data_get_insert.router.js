const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getdepartment, getdepartmentSection, getemployeemaster, getemployeeuserPass } = require("../hrm_data_get/data_get_insert.controller")

router.get("/dept", checkToken, getdepartment)

router.get("/deptsection", checkToken, getdepartmentSection)
router.get("/employeemaster", checkToken, getemployeemaster)
router.get("/employee/userPass", checkToken, getemployeeuserPass)


module.exports = router;