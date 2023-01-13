const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { requestRegistInsert, requestRegistInsertDetl } = require('../crm_request_register/requestRegister.controller');

router.post("/", checkToken, requestRegistInsert);
router.post("/postDetails", checkToken, requestRegistInsertDetl);




module.exports = router;