// const router = require("express").Router();
// const { checkToken } = require("../../authentication/token_validation");
// const { RequstToAssignList, RequstToRectifyList, RequstToVerifyList, AssignToRectify, AssignToVerify,
//     RectifyToVerify, ReqComCategorty, ReqAreaWise, ReqComPerAssigne, ReqTatPerComAssignee,
//     getCompCategory, getAllCopmDeptWise } = require('../cms_reports/cms_report.controller');


// router.post("/RequstToAssign", checkToken, RequstToAssignList);
// router.post("/RequstToRectify", checkToken, RequstToRectifyList);
// router.post("/RequstToVerify", checkToken, RequstToVerifyList);
// router.post("/AssignToRectify", checkToken, AssignToRectify);
// router.post("/AssignToVerify", checkToken, AssignToVerify);
// router.post("/RectifyToVerify", checkToken, RectifyToVerify);
// router.post("/ReqComCategorty", checkToken, ReqComCategorty);
// router.post("/ReqAreaWise", checkToken, ReqAreaWise);
// router.post("/ReqComPerAssigne", checkToken, ReqComPerAssigne);
// router.post("/ReqTatPerComAssignee", checkToken, ReqTatPerComAssignee);
// router.get("/getCompCategory", checkToken, getCompCategory);
// router.post("/getAllCopmDeptWise", checkToken, getAllCopmDeptWise);
// module.exports = router;

const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { RequstToAssignList, RequstToRectifyList, RequstToVerifyList, AssignToRectify, AssignToVerify,
    RectifyToVerify, ReqComCategorty, ReqAreaWise, ReqComPerAssigne, ReqTatPerComAssignee,
    getCompCategory, getAllCopmDeptWise ,getHoldedTickets,getPendingTicketsReport,getPendingTicketsCountReport} = require('../cms_reports/cms_report.controller');


router.post("/RequstToAssign", checkToken, RequstToAssignList);
router.post("/RequstToRectify", checkToken, RequstToRectifyList);
router.post("/RequstToVerify", checkToken, RequstToVerifyList);
router.post("/AssignToRectify", checkToken, AssignToRectify);
router.post("/AssignToVerify", checkToken, AssignToVerify);
router.post("/RectifyToVerify", checkToken, RectifyToVerify);
router.post("/ReqComCategorty", checkToken, ReqComCategorty);
router.post("/ReqAreaWise", checkToken, ReqAreaWise);
router.post("/ReqComPerAssigne", checkToken, ReqComPerAssigne);
router.post("/ReqTatPerComAssignee", checkToken, ReqTatPerComAssignee);
router.get("/getCompCategory", checkToken, getCompCategory);
router.post("/getAllCopmDeptWise", checkToken, getAllCopmDeptWise);

router.post("/getHoldedTicketsReport", checkToken, getHoldedTickets)
router.post("/getPendingTicketsReport", checkToken, getPendingTicketsReport)
router.post("/getPendingTicketsCountReport", checkToken, getPendingTicketsCountReport)

module.exports = router;