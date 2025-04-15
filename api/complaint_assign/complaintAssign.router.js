const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getcomplaintAssign, quickAssign, getEmployee, detailedAssign,
    getcomplaintAssignbyEmployee, getassistantEmployee, insertAssistemp,
    getALLcomplaintbyEmployee, getIndividualassitemployee, AssistantRecieved, TransferDept,
    assignedListNotRectifiedOnly, rectifiedListForVErify, AssistMultiple,
    getALLAssignedComList, transferInsert, EmployeeInactive,
    beforAssignHold, empTransInactive, sendMeassageUser, ReadMeassageUser, AssistReqListAll,
    getAssistRequestEmps, assistTransInactive, AssisttransferInsert, SupervsrVerifyPending, getQuery,
    SupervsrVerify, AskQuery, replyQuery, AssistanceReject, AssistReqEmployee, getAssistRequestDetails, getAssistRequestCount, getDeptPengingTicketCount
} = require('../complaint_assign/complaintAssign.controller');

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
router.patch("/assistant/reject", checkToken, AssistanceReject);

router.get("/assignedList/:id", checkToken, assignedListNotRectifiedOnly); // Not Rectified Only
router.get("/forVerifyList/:id", checkToken, rectifiedListForVErify); // Rectified Complaint For Verify List


router.post("/assist/multiple", checkToken, AssistMultiple); //Assist Needed Multiple employee
router.get("/AssignedComList/:id", checkToken, getALLAssignedComList);
router.post("/transfer/insert", checkToken, transferInsert);
router.patch("/employee/inactive", checkToken, EmployeeInactive);
router.post("/hold/beforAssign", checkToken, beforAssignHold);
router.post("/employeeTrans/Inactive", checkToken, empTransInactive);

router.patch("/sendMeassage", checkToken, sendMeassageUser);
router.patch("/ReadMeassage", checkToken, ReadMeassageUser);
router.get("/AssistReqListAll/:id", checkToken, AssistReqListAll);
router.get('/getAssistRequest/:id', checkToken, getAssistRequestEmps)
router.post("/assistTrans/Inactive", checkToken, assistTransInactive);
router.post("/Assisttransfer/insert", checkToken, AssisttransferInsert);
router.get("/SupervsrVerifyPending/:id", checkToken, SupervsrVerifyPending);
router.patch("/SupervsrVerify", checkToken, SupervsrVerify);
router.post('/askQuery', checkToken, AskQuery)
router.post('/getQuery', checkToken, getQuery)
router.post('/replyQuery', checkToken, replyQuery)
router.post('/AssistReqEmployee', checkToken, AssistReqEmployee)
router.get("/getAssistRequestDetails/:id", checkToken, getAssistRequestDetails)


router.get("/getAssistRequestCount/:id", checkToken, getAssistRequestCount)
router.get("/getDeptPengingTicketCount/:id", checkToken, getDeptPengingTicketCount)



module.exports = router;