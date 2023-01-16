const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { requestRegistInsert, requestRegistInsertDetl, getReqByDeptBase, getItemListByReqno,
    requestRegistUpdate, requestRegistDetlUpdate, getAuthorization } = require('../crm_request_register/requestRegister.controller');

router.post("/", checkToken, requestRegistInsert);
router.post("/postDetails", checkToken, requestRegistInsertDetl);
router.get("/allreqDept/:id", checkToken, getReqByDeptBase);
router.get("/getItemList/:id", checkToken, getItemListByReqno);
router.patch("/", checkToken, requestRegistUpdate);
router.patch("/patchDetails", checkToken, requestRegistDetlUpdate);

router.get("/getAuthorization/:id", checkToken, getAuthorization);



module.exports = router;