const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { updateInchargeApproval, MaxItemSlno, InactiveItemDetail, getItemListApproval, InchargeApproveDetail,
    DetailApprvInsert, updateCrfClose, updateHODApproval, updateDMSApproval, updateMSApproval,
    updateMOApproval, updateSMOApproval, updateGMApproval, updateMDApproval, updateEDApproval
} = require('../crm_req_approval/crmreq_approval.controller');

router.get("/getItemListApproval/:id", checkToken, getItemListApproval);
router.get("/MaxItemSlno/:id", checkToken, MaxItemSlno);
router.patch("/InactiveItemDetail", checkToken, InactiveItemDetail);



router.patch("/inchargeApporval/details", checkToken, InchargeApproveDetail);


router.post("/DetailApprvInsert", checkToken, DetailApprvInsert);


router.patch("/crfClose", checkToken, updateCrfClose);

router.patch("/incharge", checkToken, updateInchargeApproval);
router.patch("/Hod", checkToken, updateHODApproval);
router.patch("/Dms", checkToken, updateDMSApproval);
router.patch("/Ms", checkToken, updateMSApproval);
router.patch("/Mo", checkToken, updateMOApproval);
router.patch("/Smo", checkToken, updateSMOApproval);
router.patch("/Gm", checkToken, updateGMApproval);
router.patch("/Md", checkToken, updateMDApproval);
router.patch("/Ed", checkToken, updateEDApproval);


module.exports = router;