const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { RequstToAssignList, RequstToRectifyList, RequstToVerifyList, AssignToRectify, AssignToVerify,
    RectifyToVerify, ReqComCategorty, ReqAreaWise, ReqComPerAssigne, ReqTatPerComAssignee,
    getCompCategory } = require('../cms_reports/cms_report.controller');


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
module.exports = router;