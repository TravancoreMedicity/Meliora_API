const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { requestRegistInsert, requestRegistInsertDetl, requestApprovalInsert, getReqByDeptBase,
    getItemListByReqno, requestRegistUpdate, requestRegistDetlUpdate, getAuthorization,
    getDeptApprovList, getApprovListOthers, updateInchargeApproval, updateHodApproval, updateOMApproval,
    updateSOMpproval, updateCEOApproval, updateEDApproval, getApprovListDMS, deleteItemListByReqno,
    getCrfDeptDataCollect, CrfDeptDataCollectInsert, EditItemListByReqno,
    getDataCollectList, CrfDataCollactnSave
} = require('../crm_request_register/requestRegister.controller');

router.post("/", checkToken, requestRegistInsert);
router.post("/postDetails", checkToken, requestRegistInsertDetl);
router.post("/postReqApproval", checkToken, requestApprovalInsert);
router.get("/allreqDept/:id", checkToken, getReqByDeptBase);
router.get("/getItemList/:id", checkToken, getItemListByReqno);
router.patch("/", checkToken, requestRegistUpdate);
router.patch("/patchDetails", checkToken, requestRegistDetlUpdate);

router.get("/getAuthorization/:id", checkToken, getAuthorization);

router.get("/getDeptApprovList/:id", checkToken, getDeptApprovList);
router.get("/getApprovList/others", checkToken, getApprovListOthers);

router.patch("/approval/incharge", checkToken, updateInchargeApproval);
router.patch("/approval/hod", checkToken, updateHodApproval);
router.patch("/approval/om", checkToken, updateOMApproval);
router.patch("/approval/som", checkToken, updateSOMpproval);
router.patch("/approval/ceo", checkToken, updateCEOApproval);
router.patch("/approval/ed", checkToken, updateEDApproval);

router.get("/getApprovList/DMS", checkToken, getApprovListDMS);//getDMS approval List


router.patch("/DeleteItemList", checkToken, deleteItemListByReqno);
router.patch("/EditItemList", checkToken, EditItemListByReqno);

router.get("/getCRFDept/DataCollect", checkToken, getCrfDeptDataCollect)

router.post("/dataCollect/Insert", checkToken, CrfDeptDataCollectInsert);


router.get("/getDataCollectList/:id", checkToken, getDataCollectList);

router.patch("/CrfDataCollactnSave", checkToken, CrfDataCollactnSave);

module.exports = router;