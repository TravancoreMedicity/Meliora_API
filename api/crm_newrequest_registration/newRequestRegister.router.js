const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { requestRegistInsert, requestRegistInsertDetl, requestApprovalInsert, InHodExist, getAllReqBasedDept
} = require('../crm_newrequest_registration/newRequestRegister.controller');

router.post("/InsertRegMast", checkToken, requestRegistInsert);
router.post("/postDetails", checkToken, requestRegistInsertDetl);
router.post("/postReqApproval", checkToken, requestApprovalInsert);


router.get("/InHodExist/:id", checkToken, InHodExist)
router.get("/getAllReqBasedDept/:id", checkToken, getAllReqBasedDept);

module.exports = router;