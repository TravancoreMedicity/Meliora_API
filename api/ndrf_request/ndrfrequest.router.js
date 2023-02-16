const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { InsertNdrf, getNdrfList, updateEDApproval, ndrfApprovalInsert } = require('../ndrf_request/ndrfrequest.controller')


router.post("/NdrfInsert", checkToken, InsertNdrf)
router.get("/", checkToken, getNdrfList);
router.patch("/approval/ed", checkToken, updateEDApproval);
router.post("/postReqApproval", checkToken, ndrfApprovalInsert);

module.exports = router;