const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getcomplaintAssign, quickAssign, getEmployee, detailedAssign,
    getcomplaintAssignbyEmployee, getassistantEmployee, insertAssistemp, AssignRemark,
    getALLcomplaintbyEmployee, getIndividualassitemployee, AssistantRecieved } = require('../complaint_assign/complaintAssign.controller');

router.get("/:id", checkToken, getcomplaintAssign);
router.post("/", checkToken, quickAssign);
router.get("/emp/:id", checkToken, getEmployee);
router.post("/detailassign", checkToken, detailedAssign);
router.get("/user/:id", checkToken, getcomplaintAssignbyEmployee);
router.post("/assistant", checkToken, getassistantEmployee);
router.post("/assistant/emp", checkToken, insertAssistemp);
router.patch("/remark", checkToken, AssignRemark);
router.get("/allcomplaint/:id", checkToken, getALLcomplaintbyEmployee);
router.get("/individual/assist/:id", checkToken, getIndividualassitemployee)
router.patch("/assistant/recieved", checkToken, AssistantRecieved);


module.exports = router;