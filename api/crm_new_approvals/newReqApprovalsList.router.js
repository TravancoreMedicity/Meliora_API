const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getClosedReqList, getAllReqListNotAck, getRejectedReqList, getOnHoldReqList, getMOAppvalPending,
    getSMOAppvalPending, getGMAppvalPending, getMDAppvalPending, getEDAppvalPending
} = require('../crm_new_approvals/newReqApprovalsList.controller');

router.get("/getClosedReqList", checkToken, getClosedReqList);
router.get("/getAllReqListNotAck", checkToken, getAllReqListNotAck);
router.get("/getRejectedReqList", checkToken, getRejectedReqList);
router.get("/getOnHoldReqList", checkToken, getOnHoldReqList);
router.get("/getMOAppvalPending", checkToken, getMOAppvalPending);
router.get("/getSMOAppvalPending", checkToken, getSMOAppvalPending);
router.get("/getGMAppvalPending", checkToken, getGMAppvalPending);
router.get("/getMDAppvalPending", checkToken, getMDAppvalPending);
router.get("/getEDAppvalPending", checkToken, getEDAppvalPending);
module.exports = router;