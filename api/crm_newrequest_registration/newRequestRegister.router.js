const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { requestRegistInsert, requestRegistInsertDetl, requestApprovalInsert, InHodExist, getAllReqBasedDept,
    getDetailItemList, deleteItemListByReqno, EditItemListByReqno, UpdateReqMaster, getApprovListOthers,
    getAllListDashboard, getAllReqBasedDeptreq
} = require('../crm_newrequest_registration/newRequestRegister.controller');

router.post("/InsertRegMast", checkToken, requestRegistInsert);
router.post("/postDetails", checkToken, requestRegistInsertDetl);
router.post("/postReqApproval", checkToken, requestApprovalInsert);


router.get("/InHodExist/:id", checkToken, InHodExist)
router.post('/getAllReqBasedDept', checkToken, getAllReqBasedDept);
router.get("/getAllReqBasedDeptreq/:id", checkToken, getAllReqBasedDeptreq);
router.get("/getDetailItemList/:id", checkToken, getDetailItemList);

router.patch("/DeleteItemList", checkToken, deleteItemListByReqno);
router.patch("/EditItemList", checkToken, EditItemListByReqno);

router.patch("/UpdateReqMaster", checkToken, UpdateReqMaster);


router.get("/getApprovList/others", checkToken, getApprovListOthers);


router.get("/getAllList/Dashboard", checkToken, getAllListDashboard);
module.exports = router;