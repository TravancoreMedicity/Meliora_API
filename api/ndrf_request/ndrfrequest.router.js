const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { InsertNdrf, getNdrfList, updateEDApproval, ndrfApprovalInsert,
    updateOMApproval, updateSMOApproval, updateCAOApproval, getNdrfPdf
} = require('../ndrf_request/ndrfrequest.controller')


router.post("/NdrfInsert", checkToken, InsertNdrf)
router.get("/", checkToken, getNdrfList);
router.post("/postReqApproval", checkToken, ndrfApprovalInsert);
router.patch("/approval/om", checkToken, updateOMApproval);
router.patch("/approval/smo", checkToken, updateSMOApproval);
router.patch("/approval/cao", checkToken, updateCAOApproval);
router.patch("/approval/ed", checkToken, updateEDApproval);
router.get("/ndrfpdf", checkToken, getNdrfPdf);
module.exports = router;