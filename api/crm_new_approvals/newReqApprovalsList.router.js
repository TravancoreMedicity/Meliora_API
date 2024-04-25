const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getClosedReqList, getAllReqListNotAck, getMOAppvalPending, getSMOAppvalPending,
    getGMAppvalPending
} = require('../crm_new_approvals/newReqApprovalsList.controller');

router.get("/getClosedReqList", checkToken, getClosedReqList);
router.get("/getAllReqListNotAck ", checkToken, getAllReqListNotAck);
router.get("/getMOAppvalPending", checkToken, getMOAppvalPending);
router.get("/getSMOAppvalPending", checkToken, getSMOAppvalPending);
router.get("/getGMAppvalPending", checkToken, getGMAppvalPending);


module.exports = router;