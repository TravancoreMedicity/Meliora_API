const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getClosedReqList, getAllReqListNotAck, getMOAppvalPending
} = require('../crm_new_approvals/newReqApprovalsList.controller');

router.get("/getClosedReqList", checkToken, getClosedReqList);
router.get("/getAllReqListNotAck ", checkToken, getAllReqListNotAck);
router.get("/getMOAppvalPending", checkToken, getMOAppvalPending);

module.exports = router;