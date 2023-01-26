const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getcomplaintAssign, quickAssign, getEmployee, detailedAssign,
    getcomplaintAssignbyEmployee, getassistantEmployee, insertAssistemp,
    getALLcomplaintbyEmployee, getIndividualassitemployee, AssistantRecieved, TransferDept, assignedListNotRectifiedOnly,
    rectifiedListForVErify } = require('../complaint_assign/complaintAssign.controller');

router.get("/:id", checkToken, getcomplaintAssign);
router.post("/", checkToken, quickAssign); // quick assign
router.get("/emp/:id", checkToken, getEmployee);
router.post("/detailassign", checkToken, detailedAssign); //Detailed assign 
router.get("/user/:id", checkToken, getcomplaintAssignbyEmployee);
router.post("/assistant", checkToken, getassistantEmployee);
router.post("/assistant/emp", checkToken, insertAssistemp);
router.get("/allcomplaint/:id", checkToken, getALLcomplaintbyEmployee);
router.get("/individual/assist/:id", checkToken, getIndividualassitemployee)
router.patch("/assistant/recieved", checkToken, AssistantRecieved);
router.patch("/complaint/transfer", checkToken, TransferDept); // transfer complaint departement

router.get("/assignedList/:id", checkToken, assignedListNotRectifiedOnly); // Not Rectified Only
router.get("/forVerifyList/:id", checkToken, rectifiedListForVErify); // Rectified Complaint For Verify List


module.exports = router;