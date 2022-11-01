const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { complaintDeptInsert, complaintDeptUpdate, getcomplaintDept, getcomplaintDeptById,
    deletecomplaintDept, getComplaintDeptStatus } = require('../cm_complaintdepartment/complaintdept.controller');

router.post("/", checkToken, complaintDeptInsert);
router.patch("/", checkToken, complaintDeptUpdate);
router.get("/", checkToken, getcomplaintDept);


router.post("/byid", checkToken, getcomplaintDeptById);


router.delete("/", checkToken, deletecomplaintDept);

router.get('/status', checkToken, getComplaintDeptStatus)


module.exports = router;