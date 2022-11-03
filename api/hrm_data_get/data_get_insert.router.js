const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getdepartment } = require("../hrm_data_get/data_get_insert.controller")

router.get("/dept", checkToken, getdepartment)



module.exports = router;