const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { InsertNdrf, getNdrfList, updateEDApproval, ndrfApprovalInsert,
    updateOMApproval, updateSMOApproval, updateCAOApproval, getNdrfPdf,
    updateMDApproval, ndrfDetailInsert, getItemListDataCollectByReqno,
    purchaseAcknlodge, purchasePoClose, InsertsinglePO, InsertMultiplePO,
    getPOList
} = require('../ndrf_request/ndrfrequest.controller')


router.post("/NdrfInsert", checkToken, InsertNdrf)
router.get("/", checkToken, getNdrfList);
router.post("/postReqApproval", checkToken, ndrfApprovalInsert);
router.post("/ndrfDetailInsert", checkToken, ndrfDetailInsert);

router.get("/getItemListDataCollect/:id", checkToken, getItemListDataCollectByReqno);

router.patch("/approval/om", checkToken, updateOMApproval);
router.patch("/approval/smo", checkToken, updateSMOApproval);
router.patch("/approval/cao", checkToken, updateCAOApproval);
router.patch("/approval/ed", checkToken, updateEDApproval);
router.patch("/approval/md", checkToken, updateMDApproval);
router.get("/ndrfpdf", checkToken, getNdrfPdf);

router.patch("/purchaseAcknlodge", checkToken, purchaseAcknlodge);

router.patch("/purchasePoClose", checkToken, purchasePoClose);
router.post("/InsertsinglePO", checkToken, InsertsinglePO)
router.post("/InsertMultiplePO", checkToken, InsertMultiplePO);
router.get("/getPOList/:id", checkToken, getPOList);

module.exports = router;